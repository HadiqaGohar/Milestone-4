// Add a new skill dynamically
document.getElementById("addSkillButton")?.addEventListener("click", function () {
    const skillsContainer = document.getElementById("skillsContainer");
    const skillWrapper = document.createElement("div");
    skillWrapper.classList.add("flex", "mb-2");

    const newSkillInput = document.createElement("input");
    newSkillInput.type = "text";
    newSkillInput.name = "skills[]";
    newSkillInput.placeholder = "Enter a skill";
    newSkillInput.required = true;
    newSkillInput.classList.add("border", "border-gray-300", "rounded-md", "p-2", "w-full");

    const removeSkillButton = document.createElement("button");
    removeSkillButton.textContent = "Remove";
    removeSkillButton.type = "button";
    removeSkillButton.classList.add("bg-red-500", "text-white", "px-2", "ml-2", "rounded");
    removeSkillButton.addEventListener("click", () => {
        skillsContainer.removeChild(skillWrapper);
    });

    skillWrapper.appendChild(newSkillInput);
    skillWrapper.appendChild(removeSkillButton);
    skillsContainer.appendChild(skillWrapper);
});

// Generate resume and make sections editable
document.getElementById("resumeForm")?.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form refresh

    const formElement = this;
    const formData = new FormData(formElement);
    const resumePreview = document.getElementById("resumePreview");

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const education = formData.get("education");
    const experience = formData.get("experience");
    const skills = formData.getAll("skills[]").join(", ");

    // Handle profile picture
    const profilePictureInput = document.getElementById("profilePicture");
    const profilePicture = profilePictureInput ? profilePictureInput.files[0] : null;
    const profilePictureUrl = profilePicture ? URL.createObjectURL(profilePicture) : '';

    resumePreview.innerHTML = `
        <h2 class="text-xl font-semibold">Resume Preview</h2>
        ${profilePictureUrl ? `<img src="${profilePictureUrl}" alt="Profile Picture" class="w-32 h-32 rounded-full mb-4">` : ''}
        <p><strong>First Name:</strong> <span class="editable" contenteditable="true">${firstName}</span></p>
        <p><strong>Last Name:</strong> <span class="editable" contenteditable="true">${lastName}</span></p>
        <p><strong>Email:</strong> <span class="editable" contenteditable="true">${email}</span></p>
        <p><strong>Education:</strong> <span class="editable" contenteditable="true">${education}</span></p>
        <p><strong>Work Experience:</strong> <span class="editable" contenteditable="true">${experience}</span></p>
        <p><strong>Skills:</strong> <span class="editable" contenteditable="true">${skills}</span></p>
    `;
});

// Generate and download resume as a PDF
document.getElementById("downloadPdfButton")?.addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const resumePreview = document.getElementById("resumePreview");

    const resumeContent = resumePreview ? resumePreview.innerText : '';
    const profilePicture = resumePreview ? resumePreview.querySelector('img') : null;

    if (resumeContent) {
        // Add profile picture if available
        if (profilePicture) {
            doc.addImage(profilePicture.src, 'JPEG', 10, 10, 50, 50);
        }

        doc.text("Resume", 10, 70); // Add a title to the PDF
        doc.text(resumeContent, 10, 80); // Add resume content

        // Save the generated PDF with a file name
        doc.save("Hadiqa_Gohar_Resume.pdf");
    }
});
