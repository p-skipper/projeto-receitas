function handlePasswordForm(event) {
    event.preventDefault();

    const email = document.getElementById("emailPasswordForm").value;

    if (email) {
        window.location.assign("./login.html?form=submit");
    } else {
        document.getElementById("emailPasswordForm").classList.remove("outline");
        document.getElementById("emailPasswordForm").classList.add("outlineError");
        document.getElementById("emailPasswordForm").style.backgroundColor = "#ff660041";
        document.getElementById("errorEmailPasswordForm").innerText = "Insira um endereço de e-mail válido";
    }
}

document.getElementById("forgotPasswordForm")?.addEventListener("submit", handlePasswordForm);
