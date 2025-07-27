document.addEventListener("DOMContentLoaded", () => {
  console.log("📌 Content script loaded and ready!");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("🔹 Message received in content script:", request);

  if (request.action === "autofill") {
    autofillForm();
  }
});

// Field mappings for accurate autofilling
const fieldMappings = {
  firstName: ["firstname", "fname", "givenname"],
  middleName: ["middlename", "mname", "middle"],
  lastName: ["lastname", "lname", "surname"],
  fullName: ["name", "fullname", "full_name"],
  phone: ["phone", "phonenumber", "mobile", "contact"],
  email: ["email", "emailaddress", "mail"],
};

// Function to autofill form fields
function autofillForm() {
  chrome.storage.sync.get("userData", (data) => {
    if (!data.userData) {
      alert("No user data found. Please log in first.");
      return;
    }

    const userData = flattenObject(data.userData);
    console.log("📌 Stored API Data:", userData);

    const fields = document.querySelectorAll("input, textarea, select");
    let detectedFields = 0;
    let filledFields = 0;

    console.log("🔍 Starting field detection...");
    console.log(`Found ${fields.length} total form fields in DOM`);

    fields.forEach((field) => {
      let fieldType = getFieldType(field);

      if (fieldType) {
        detectedFields++;
        console.log(`🎯 Detected field: Type=${fieldType}, Name=${field.name}, ID=${field.id}, Placeholder=${field.placeholder}`);
        
        let autofillValue = getAutofillValue(fieldType, userData);
        if (autofillValue) {
          field.value = autofillValue;
          filledFields++;
          console.log(`✅ Autofilled '${fieldType}' with '${autofillValue}'`);
        } else {
          console.log(`❌ No valid data found for '${fieldType}'`);
        }
      }
    });

    console.log(`📊 Summary: Detected ${detectedFields} fields, Successfully filled ${filledFields} fields`);
    alert(`Form autofilled successfully! (${filledFields}/${detectedFields} fields)`);
  });
}

// Function to determine field type (firstName, lastName, email, etc.)
function getFieldType(field) {
  const placeholder = (field.placeholder || "").toLowerCase().trim();
  const fieldName = (field.name || "").toLowerCase().trim();
  const fieldId = (field.id || "").toLowerCase().trim();

  // Check firstName fields
  if (matchesField(placeholder, fieldMappings.firstName) || matchesField(fieldName, fieldMappings.firstName) || matchesField(fieldId, fieldMappings.firstName)) {
    return "firstName";
  }

  // Check middleName fields
  if (matchesField(placeholder, fieldMappings.middleName) || matchesField(fieldName, fieldMappings.middleName) || matchesField(fieldId, fieldMappings.middleName)) {
    return "middleName";
  }

  // Check lastName fields
  if (matchesField(placeholder, fieldMappings.lastName) || matchesField(fieldName, fieldMappings.lastName) || matchesField(fieldId, fieldMappings.lastName)) {
    return "lastName";
  }

  // Check fullName fields (only if not firstName or lastName)
  if (matchesField(placeholder, fieldMappings.fullName) || matchesField(fieldName, fieldMappings.fullName) || matchesField(fieldId, fieldMappings.fullName)) {
    return "fullName";
  }

  // Check email fields
  if (matchesField(placeholder, fieldMappings.email) || matchesField(fieldName, fieldMappings.email) || matchesField(fieldId, fieldMappings.email)) {
    return "email";
  }

  // Check phone fields
  if (matchesField(placeholder, fieldMappings.phone) || matchesField(fieldName, fieldMappings.phone) || matchesField(fieldId, fieldMappings.phone)) {
    return "phone";
  }

  return null;
}

// Function to check if a field matches a known category
function matchesField(value, possibleValues) {
  return possibleValues.some(val => value.includes(val));
}

// Function to get the correct autofill value
function getAutofillValue(fieldType, userData) {
  switch (fieldType) {
    case "firstName":
      return userData.firstName || "";
    case "middleName":
      return userData.middleName || "";
    case "lastName":
      return userData.lastName || "";
    case "fullName":
      return `${userData.firstName || ""} ${userData.middleName || ""} ${userData.lastName || ""}`.replace(/\s+/g, ' ').trim();
    case "email":
      return userData.primaryEmail || "";
    case "phone":
      return userData.primaryPhone || "";
    default:
      return "";
  }
}

// Function to flatten nested objects
function flattenObject(obj, prefix = "") {
  console.log(`🔄 Start${prefix ? ` (${prefix})` : ''}`);
  let flattened = {};
  Object.keys(obj).forEach((key) => {
    let newKey = prefix ? `${prefix}_${key}` : key;
    console.log(`📝 Key: ${newKey}`);
    if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
      console.log(`📦 Nested: ${newKey}`);
      Object.assign(flattened, flattenObject(obj[key], newKey));
    } else {
      console.log(`✅ Set: ${newKey}`);
      flattened[newKey] = obj[key];
    }
  });
  console.log(`✨ Done${prefix ? ` (${prefix})` : ''}`);
  return flattened;
}
