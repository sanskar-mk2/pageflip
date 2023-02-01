function content() {
    return [
        {
            title: "Business Management",
            href: "https://goskytab.com/pos-features/lighthouse-back-office/",
            para: "Enterprise Level Reporting & Analytics tools to run your business, manage your employees and engage customers so you can grow your bottom line.",
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
            title: "Online Storefront",
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
            pos: "center",
        },
    ];
}

async function slide_up_m(page, lock) {
    lock.val = true;
    const tl = gsap.timeline();
    const tl2 = gsap.timeline();
    const h = document.getElementById(page).clientHeight;
    tl.fromTo(
        `#${page}`,
        0.2,
        { y: "0px" },
        { y: `-${h}px`, ease: Power4.easeOut }
    );
    second_last_char = page.substr(page.length - 2);
    next_num = parseInt(second_last_char) + 1;
    next_p = page.substr(0, page.length - 2) + next_num + "m";

    tl2.fromTo(
        `#${next_p}`,
        0.2,
        { y: `${h}px` },
        { y: "0px", ease: Power4.easeOut }
    );
    tl2.eventCallback("onComplete", () => {
        lock.val = false;
    });
    return tl;
}

async function slide_down_m(page, lock) {
    lock.val = true;
    const tl = gsap.timeline();
    const tl2 = gsap.timeline();
    h = document.getElementById(page).clientHeight;
    tl.fromTo(
        `#${page}`,
        0.2,
        { y: "0px" },
        { y: `${h}px`, ease: Power4.easeIn }
    );
    second_last_char = page.substr(page.length - 2);
    prev_num = parseInt(second_last_char) - 1;
    prev_p = page.substr(0, page.length - 2) + prev_num + "m";

    tl2.fromTo(
        `#${prev_p}`,
        0.2,
        { y: `-${h}px` },
        { y: "0px", ease: Power4.easeIn }
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
        ease: Circ.easeIn,
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
        ease: Circ.easeOut,
    });
    // release lock await on complete event
    tl.eventCallback("onComplete", () => {
        lock.val = false;
    });
    return tl;
}

const toucher = () => {
    return {
        lock: {
            val: false,
        },
        touchstartX: 0,
        touchstartY: 0,
        touchendX: 0,
        touchendY: 0,
        cp: 0,
        cp2: 0,
        handleGesture: function () {
            const switches = {
                x: 0,
                y: 0,
            };

            if (this.touchendX !== this.touchstartX) {
                switches.x = this.touchendX - this.touchstartX;
            }

            if (this.touchendY !== this.touchstartY) {
                switches.y = this.touchendY - this.touchstartY;
            }

            return switches;
        },

        tstart: function (event) {
            this.touchstartX = event.changedTouches[0].screenX;
            this.touchstartY = event.changedTouches[0].screenY;
        },
        tend: async function (event) {
            if (this.lock.val) {
                return;
            }
            this.touchendX = event.changedTouches[0].screenX;
            this.touchendY = event.changedTouches[0].screenY;
            let { x, y } = this.handleGesture();
            if (Math.max(Math.abs(x), Math.abs(y)) === Math.abs(y)) {
                // vertical move
                if (this.cp === 2) {
                    if (y < 0) {
                        if (this.cp2 === 4) {
                            return;
                        }
                        await slide_up_m("p2" + this.cp2 + "m", this.lock);
                        this.cp2 = this.cp2 + 1;
                    } else if (y > 0) {
                        if (this.cp2 === 0) {
                            return;
                        }
                        await slide_down_m("p2" + this.cp2 + "m", this.lock);
                        this.cp2 = this.cp2 - 1;
                    }
                }
            } else {
                // horizontal move
                if (x < 0) {
                    if (this.cp === 3) {
                        return;
                    } else {
                        await next_page_anim(this.cp + "m", this.lock);
                        this.cp = this.cp + 1;
                    }
                } else if (x > 1) {
                    if (this.cp === 0) {
                        return;
                    } else {
                        this.cp = this.cp - 1;
                        await prev_page_anim(this.cp + "m", this.lock);
                    }
                }
            }
        },
    };
};

async function slide_up(page, lock) {
    lock.val = true;
    const tl = gsap.timeline();
    const tl2 = gsap.timeline();
    tl.fromTo(
        `#${page}`,
        0.2,
        { y: "0px" },
        { y: "-768px", ease: Power4.easeOut }
    );
    const next_p = page.replace(/.$/, parseInt(page.slice(-1)) + 1);
    tl2.fromTo(
        `#${next_p}`,
        0.2,
        { y: "768px" },
        { y: "0px", ease: Power4.easeOut }
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
        { y: "768px", ease: Power4.easeIn }
    );
    const prev_p = page.replace(/.$/, parseInt(page.slice(-1)) - 1);
    tl2.fromTo(
        `#${prev_p}`,
        0.2,
        { y: "-768px" },
        { y: "0px", ease: Power4.easeIn }
    );
    tl2.eventCallback("onComplete", () => {
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
                ease: Circ.easeIn,
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
                ease: Circ.easeOut,
            });
            await tl.eventCallback("onComplete", () => {
                lock.val = false;
            });
        }
    }
    // release lock await on complete event
    return tl;
}

// shake #swipe
gsap.fromTo(
    ".swipe",
    1,
    { x: "0px" },
    { x: "10px", repeat: -1, yoyo: true, ease: Back.easeIn },
);