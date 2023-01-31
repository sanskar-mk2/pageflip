/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./*.html"],
    theme: {
        extend: {
            colors: {
                sky: "#136EF6",
            },
            width: {
                cw: "576px",
            },
            height: {
                ch: "768px",
            },
        },
    },
    plugins: [],
};
