/* Saéfuku — site scripts (no jQuery) */
(function () {
    "use strict";

    document.documentElement.classList.add("js");

    var WA_NUMBER = "6289657707497";

    /* Sticky header shadow */
    var header = document.querySelector(".site-header");
    var backToTop = document.querySelector(".back-to-top");
    function onScroll() {
        var y = window.scrollY || window.pageYOffset;
        if (header) header.classList.toggle("is-scrolled", y > 8);
        if (backToTop) backToTop.classList.toggle("is-visible", y > 480);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (backToTop) {
        backToTop.addEventListener("click", function (e) {
            e.preventDefault();
            var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        });
    }

    /* Reveal on scroll */
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    io.unobserve(entry.target);
                }
            });
        }, { rootMargin: "0px 0px -6% 0px", threshold: 0 });
        revealEls.forEach(function (el) { io.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }

    /* Hero slideshow (cross-fade, pauses on hover/focus, respects reduced motion) */
    var slides = document.querySelector(".hero-slides");
    if (slides) {
        var imgs = Array.prototype.slice.call(slides.querySelectorAll("img"));
        if (imgs.length > 1) {
            var current = 0, timer = null;
            var interval = parseInt(slides.getAttribute("data-interval"), 10) || 4500;
            var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            var dots = document.createElement("ul");
            dots.className = "hero-dots";
            dots.setAttribute("aria-label", "Pilih foto");
            imgs.forEach(function (img, i) {
                var li = document.createElement("li");
                var b = document.createElement("button");
                b.type = "button";
                b.setAttribute("aria-label", "Foto " + (i + 1) + " dari " + imgs.length);
                b.addEventListener("click", function () { show(i); restart(); });
                li.appendChild(b); dots.appendChild(li);
            });
            slides.parentNode.appendChild(dots);
            var buttons = dots.querySelectorAll("button");
            function show(i) {
                imgs[current].classList.remove("is-active");
                buttons[current].removeAttribute("aria-current");
                current = (i + imgs.length) % imgs.length;
                imgs[current].classList.add("is-active");
                buttons[current].setAttribute("aria-current", "true");
            }
            function start() { if (!reduceMotion && !timer) timer = setInterval(function () { show(current + 1); }, interval); }
            function stop() { clearInterval(timer); timer = null; }
            function restart() { stop(); start(); }
            show(0);
            start();
            var wrap = slides.parentNode;
            wrap.addEventListener("mouseenter", stop);
            wrap.addEventListener("mouseleave", start);
            wrap.addEventListener("focusin", stop);
            wrap.addEventListener("focusout", start);
            document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
        }
    }

    /* Current year */
    document.querySelectorAll("[data-year]").forEach(function (el) {
        el.textContent = String(new Date().getFullYear());
    });

    /* Close mobile nav after choosing a link */
    var collapse = document.getElementById("navbarMain");
    if (collapse && window.bootstrap) {
        collapse.querySelectorAll(".nav-link").forEach(function (link) {
            link.addEventListener("click", function () {
                if (collapse.classList.contains("show")) {
                    bootstrap.Collapse.getOrCreateInstance(collapse).hide();
                }
            });
        });
    }

    /* Build a WhatsApp link from a form */
    function waLink(text) {
        return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
    }

    function handleForm(form, buildMessage) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            if (!form.checkValidity()) {
                form.classList.add("was-validated");
                var firstInvalid = form.querySelector(":invalid");
                if (firstInvalid) firstInvalid.focus();
                return;
            }
            var url = waLink(buildMessage(new FormData(form)));
            var win = window.open(url, "_blank", "noopener");
            if (!win) window.location.href = url;
            var note = form.querySelector("[data-form-note]");
            if (note) {
                note.textContent = "WhatsApp terbuka di tab baru. Jika tidak muncul, izinkan pop-up lalu klik kirim lagi.";
                note.hidden = false;
            }
        });
    }

    /* Order form (pesan.html) */
    var orderForm = document.getElementById("orderForm");
    if (orderForm) {
        var params = new URLSearchParams(window.location.search);
        var preset = params.get("produk");
        var productSelect = orderForm.querySelector("[name=produk]");
        if (preset && productSelect) {
            Array.prototype.some.call(productSelect.options, function (opt) {
                if (opt.value === preset) { productSelect.value = preset; return true; }
                return false;
            });
        }
        handleForm(orderForm, function (data) {
            var lines = [
                "Halo Saéfuku, saya mau pesan:",
                "",
                "Produk: " + data.get("produk"),
                "Warna: " + (data.get("warna") || "-"),
                "Jumlah: " + data.get("jumlah"),
                "",
                "Nama: " + data.get("nama"),
                "Kota/Alamat: " + data.get("alamat"),
            ];
            if (data.get("catatan")) lines.push("Catatan: " + data.get("catatan"));
            lines.push("", "Mohon info ketersediaan dan total harganya ya. Terima kasih.");
            return lines.join("\n");
        });
    }

    /* Contact form (contact.html) */
    var contactForm = document.getElementById("contactForm");
    if (contactForm) {
        handleForm(contactForm, function (data) {
            return [
                "Halo Saéfuku,",
                "",
                data.get("pesan"),
                "",
                "— " + data.get("nama"),
            ].join("\n");
        });
    }
})();
