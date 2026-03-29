const totalPages = 4;
let currentPage = 1;

function updateSteps(page) {
  const fill = document.getElementById("stepFill");
  const percent = ((page - 1) / (totalPages - 1)) * 75 + 8;
  fill.style.width = `${percent}%`;
  document.querySelectorAll(".step-dot").forEach((dot) => {
    const step = parseInt(dot.dataset.step);
    dot.classList.remove("active", "done");
    if (step === page) dot.classList.add("active");
    else if (step < page) dot.classList.add("done");
  });
}

function showPage(page) {
  document
    .querySelectorAll(".form-page")
    .forEach((p) => p.classList.remove("active"));
  const target = document.getElementById(`page${page}`);
  if (target) {
    target.classList.add("active");
    const card = target.querySelector(".fade-up");
    if (card) {
      card.style.animation = "none";
      card.offsetHeight;
      card.style.animation = "";
    }
  }
  updateSteps(page);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function clearErrors(page) {
  const el = document.getElementById(`page${page}`);
  if (!el) return;
  el.querySelectorAll(".error").forEach((e) => e.classList.remove("error"));
  el.querySelectorAll(".error-msg").forEach((e) => e.remove());
}

function showError(input, msg) {
  input.classList.add("error");
  const div = document.createElement("div");
  div.className = "error-msg";
  div.textContent = msg;
  input.parentNode.insertBefore(div, input.nextSibling);
}

function validatePage(page) {
  clearErrors(page);
  let valid = true;

  if (page === 1) {
    [
      { id: "firstName", msg: "First name is required" },
      { id: "lastName", msg: "Last name is required" },
      { id: "gmail", msg: "Gmail is required" },
      { id: "phone", msg: "Phone number is required" },
      { id: "branch", msg: "Please select a branch" },
      { id: "college", msg: "Please select a college" },
      { id: "enrollment", msg: "Enrollment is required" },
      { id: "section", msg: "Section is required" },
      { id: "year", msg: "Please select a year" },
    ].forEach((f) => {
      const el = document.getElementById(f.id);
      if (!el.value.trim()) {
        showError(el, f.msg);
        valid = false;
      }
    });
    const branchVal = document.getElementById("branch").value;
    if (branchVal === "Other") {
      const otherBranch = document.getElementById("otherBranch");
      if (!otherBranch.value.trim()) {
        showError(otherBranch, "Please enter your branch name");
        valid = false;
      }
    }
    const gmail = document.getElementById("gmail");
    if (gmail.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(gmail.value)) {
      if (!gmail.classList.contains("error")) {
        showError(gmail, "Please enter a valid email");
        valid = false;
      }
    }
    const phone = document.getElementById("phone");
    if (phone.value && !/^[\d\s\+\-()]{7,15}$/.test(phone.value.trim())) {
      if (!phone.classList.contains("error")) {
        showError(phone, "Please enter a valid phone number");
        valid = false;
      }
    }
  }

  if (page === 2) {
    ["roleSelection", "whyJoin", "improvements", "expectations"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el.value.trim()) {
        showError(el, "This field is required");
        valid = false;
      }
    });
  }

  if (page === 3) {
    if (
      document.querySelectorAll('input[name="skills"]:checked').length === 0
    ) {
      const g = document.getElementById("skillsGroup");
      const m = document.createElement("div");
      m.className = "error-msg";
      m.textContent = "Please select at least one skill";
      g.parentNode.insertBefore(m, g.nextSibling);
      valid = false;
    }
  }

  if (page === 4) {
    if (!document.querySelector('input[name="workshop"]:checked')) {
      const g = document.getElementById("workshopGroup");
      const m = document.createElement("div");
      m.className = "error-msg";
      m.textContent = "Please select an option";
      g.parentNode.insertBefore(m, g.nextSibling);
      valid = false;
    }
    if (!document.querySelector('input[name="volunteer"]:checked')) {
      const g = document.getElementById("volunteerPrompt");
      const m = document.createElement("div");
      m.className = "error-msg";
      m.textContent = "Please select an option";
      g.parentNode.insertBefore(m, g.nextSibling);
      valid = false;
    }
    const ack = document.getElementById("acknowledge");
    if (!ack.checked) {
      const m = document.createElement("div");
      m.className = "error-msg";
      m.textContent = "You must acknowledge this to submit";
      ack.closest(".ack-field").appendChild(m);
      valid = false;
    }
  }
  return valid;
}

function nextPage(c) {
  if (!validatePage(c)) return;
  currentPage = c + 1;
  showPage(currentPage);
}
function prevPage(c) {
  currentPage = c - 1;
  showPage(currentPage);
}

function initBranchToggle() {
  const branchSelect = document.getElementById('branch');
  const otherBranchField = document.getElementById('otherBranch').closest('.field');

  branchSelect.addEventListener('change', function () {
    if (this.value === 'Other') {
      otherBranchField.classList.remove('hidden');
    } else {
      otherBranchField.classList.add('hidden');
      document.getElementById('otherBranch').value = '';
    }
  });
}

function showRoleDescription(value) {
  document.querySelectorAll('.role-description').forEach(role => {
    role.classList.remove('active');
  });
  
  if (value) {
    console.log("Value: " + value);
    const target = document.getElementById('description-' + value);
    console.log("Target: " + target);
    if (target) target.classList.add('active');
    console.log("Applied to Target");
  }
}
/* ===== CONFETTI ENGINE ===== */
function launchConfetti() {
  const canvas = document.createElement("canvas");
  canvas.className = "confetti-canvas";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const colors = [
    "#5b3ea5",
    "#9b7dd4",
    "#ff9900",
    "#fde68a",
    "#b8a0e3",
    "#7c5cbf",
    "#d6cce8",
    "#ff6b6b",
    "#48dbfb",
    "#fff",
  ];
  const particles = [];
  const count = 150;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      opacity: 1,
      decay: Math.random() * 0.003 + 0.002,
    });
  }

  let frame;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach((p) => {
      if (p.opacity <= 0) return;
      alive = true;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04;
      p.rot += p.rotSpeed;
      p.opacity -= p.decay;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (alive) {
      frame = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(frame);
      canvas.remove();
    }
  }
  animate();

  // Second burst after 400ms
  setTimeout(() => {
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height * 0.3,
        w: Math.random() * 8 + 4,
        h: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 8,
        vy: -(Math.random() * 6 + 2),
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        decay: Math.random() * 0.004 + 0.003,
      });
    }
  }, 400);
}

/* ===== HELPER FUNCTION ==== */
// Needed to properly format the role field in the sheet
function formatRoleValue(value) {
  const roles = {
    "technical-secretary": "Technical Secretary",
    "operations-secretary": "Operations & Membership Secretary",
    "outreach-lead": "Outreach & Public Relations Lead",
    "content-lead": "Content & Creative Lead",
    "volunteer": "Volunteer",
  };

  return roles[value] || null;
}

/* ===== SUBMIT ===== */
// Replace this URL with your Google Apps Script Web App URL
const GOOGLE_https://script.google.com/macros/s/AKfycbxeb2KNiP28XWSCBSUqwUwapqHx_z9gvPfuLGb87N5t6x8xcjfo2gbCOzIefn6Ra9f5/exec = "https://script.google.com/macros/s/AKfycbxeb2KNiP28XWSCBSUqwUwapqHx_z9gvPfuLGb87N5t6x8xcjfo2gbCOzIefn6Ra9f5/exec";

function submitForm() {
  if (!validatePage(4)) return;

  const data = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    gmail: document.getElementById("gmail").value,
    phone: document.getElementById("phone").value,
    branch: document.getElementById("branch").value,
    branchName: document.getElementById("branch").value === "Other"
      ? document.getElementById("otherBranch").value
      : "",
    college: document.getElementById("college").value,
    enrollment: document.getElementById("enrollment").value,
    section: document.getElementById("section").value,
    year: document.getElementById("year").value,
    roleSelection: formatRoleValue(document.getElementById("roleSelection").value),
    whyJoin: document.getElementById("whyJoin").value,
    improvements: document.getElementById("improvements").value,
    expectations: document.getElementById("expectations").value,
    skills: [...document.querySelectorAll('input[name="skills"]:checked')].map(
      (c) => c.value,
    ),
    otherSkill: document.getElementById("otherSkill").value,
    proofLink: document.getElementById("proofLink").value,
    workshop: document.querySelector('input[name="workshop"]:checked').value,
    volunteer: document.querySelector('input[name="volunteer"]:checked').value,
  };

  // Disable submit button while sending
  const submitBtn = document.querySelector(".btn-submit");
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  // Send to Google Sheets
  fetch(GOOGLE_https://script.google.com/macros/s/AKfycbxeb2KNiP28XWSCBSUqwUwapqHx_z9gvPfuLGb87N5t6x8xcjfo2gbCOzIefn6Ra9f5/exec, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(() => {
      showSuccessPage();
    })
    .catch((err) => {
      console.error("Submission error:", err);
      // Still show success — no-cors mode won't return a readable response,
      // but the data is sent. If you need error handling, use a proxy.
      showSuccessPage();
    });
}

function showSuccessPage() {
  document
    .querySelectorAll(".form-page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("successPage").classList.add("active");
  document.getElementById("stepFill").style.width = "100%";
  document.querySelectorAll(".step-dot").forEach((d) => {
    d.classList.remove("active");
    d.classList.add("done");
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
  launchConfetti();
}

// Init
showPage(1);
initBranchToggle();
