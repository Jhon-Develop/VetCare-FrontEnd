/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cWhite: "#FFFCD1",
                cGreen: "#07D8AE",
                cPurple: "#8C04BC",
                cYellow: "#F2E533",
                cBlack: "#000000",
                cGray: "#707070",
            },
            fontFamily: {
                MontserratItalic: ['MontserratItalic'],
                MontserratRegular: ['MontserratRegular'],
                MontserratMedium: ['MontserratMedium'],
                MontserratSemibold: ['MontserratSemibold'],
                MontserratBold: ['MontserratBold'],
                MontserrarLight: ['MontserrarLight'],
            },
            borderRadius: {
                'custom': '3rem',
            },
        },
    },
    plugins: [],
}