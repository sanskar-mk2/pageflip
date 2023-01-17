function content() {
    return [
        {
            title: "Employee management card",
            href: "https://goskytab.com/pos-features/lighthouse-back-office/",
            para: "Enterprise Level Reporting & Analytics tools to you run your business, manage your employees and engage customers so you can grow your bottom line.",
            img: "./images/0.png",
            pos: "center",
        },
        {
            title: "Business Working Capital",
            href: "https://goskytab.com/services/#!/working-capital",
            para: "A business cash advance enables you to generate the working capital you need without having to negotiate with a bank or worry about long-term credit card interest.",
            img: "./images/1.jpg",
            pos: "center",
        },
        {
            title: "Online Storefront card",
            href: "https://launch.shift4shop.com/partners?oid=POSG1-S4A21",
            para: "A Premium Enterprise-Grade eCommerce Solution Completely Free For Life!",
            img: "./images/2.webp",
            pos: "center",
        },
        {
            title: "Smart Equipment Options",
            href: "https://goskytab.com/equipment-and-processing-options/",
            para: "Choose from a wide variety of Free Point of Sale systems with no up-front costs.",
            img: "./images/cluster.png",
            pos: "center",
        },
        {
            title: "Secure Payments",
            href: "https://goskytab.com/",
            para: "Streamline operations and future-proof your business with cutting-edge POS software and state-of-the-art hardware.",
            img: "./images/sec.jpg",
            pos: "right",
        },
    ];
}

// touchableElement.addEventListener(
//     "touchstart",
//     function (event) {
//         touchstartX = event.changedTouches[0].screenX;
//         touchstartY = event.changedTouches[0].screenY;
//     },
//     false
// );

// touchableElement.addEventListener(
//     "touchend",
//     function (event) {
//         touchendX = event.changedTouches[0].screenX;
//         touchendY = event.changedTouches[0].screenY;
//         handleGesture();
//     },
//     false
// );

function handleGesture() {
    if (touchendX < touchstartX) {
        console.log("Swiped Left");
    }

    if (touchendX > touchstartX) {
        console.log("Swiped Right");
    }

    if (touchendY < touchstartY) {
        console.log("Swiped Up");
    }

    if (touchendY > touchstartY) {
        console.log("Swiped Down");
    }

    if (touchendY === touchstartY) {
        console.log("Tap");
    }
}

async function slide_up(page, lock) {
    lock.val = true;
    const tl = gsap.timeline();
    const tl2 = gsap.timeline();
    tl.fromTo(
        `#${page}`,
        0.2,
        { y: "0px" },
        { y: "-768px", ease: Linear.easeNone }
    );
    const next_p = page.replace(/.$/, parseInt(page.slice(-1)) + 1);
    tl2.fromTo(
        `#${next_p}`,
        0.2,
        { y: "768px" },
        { y: "0px", ease: Linear.easeNone }
    );
    tl2.eventCallback("onComplete", () => {
        lock.val = false;
    });
    return tl;
}

async function slide_down(page, lock) {
    const tl = gsap.timeline();
    const tl2 = gsap.timeline();
    tl.fromTo(
        `#${page}`,
        0.2,
        { y: "0px" },
        { y: "768px", ease: Linear.easeNone }
    );
    const prev_p = page.replace(/.$/, parseInt(page.slice(-1)) - 1);
    tl2.fromTo(
        `#${prev_p}`,
        0.2,
        { y: "-768px" },
        { y: "0px", ease: Linear.easeNone }
    );
    tl2.eventCallback("onComplete", () => {
        lock.val = false;
    });
    return tl;
}

async function next_page_anim(page, lock) {
    //lock
    lock.val = true;
    const tl = gsap.timeline();
    tl.to(`#page${page}`, 1, {
        rotationY: -79,
        transformOrigin: "0% 0%",
        ease: Linear.easeNone,
    });
    tl.eventCallback("onComplete", () => {
        lock.val = false;
    });
    return tl;
}

async function prev_page_anim(page, lock) {
    //lock
    lock.val = true;
    const tl = gsap.timeline();
    tl.to(`#page${page}`, 1, {
        rotationY: 0,
        transformOrigin: "0% 0%",
        ease: Linear.easeNone,
    });
    // release lock await on complete event
    tl.eventCallback("onComplete", () => {
        lock.val = false;
    });
    return tl;
}

async function from_to_anim(from, to, lock) {
    //lock
    if (from.val === to) {
        return;
    }
    const tl = gsap.timeline();

    if (from.val < to) {
        while (from.val < to) {
            lock.val = true;
            tl.to(`#page${from.val}`, 1, {
                rotationY: -79,
                transformOrigin: "0% 0%",
                ease: Linear.easeNone,
            });
            await tl.eventCallback("onComplete", () => {
                lock.val = false;
            });
            from.val++;
        }
    } else {
        while (from.val > to) {
            from.val--;
            lock.val = true;
            tl.to(`#page${from.val}`, 1, {
                rotationY: 0,
                transformOrigin: "0% 0%",
                ease: Linear.easeNone,
            });
            await tl.eventCallback("onComplete", () => {
                lock.val = false;
            });
        }
    }
    // release lock await on complete event
    return tl;
}
