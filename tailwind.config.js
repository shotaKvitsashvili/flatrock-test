/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true
        },
        extend: {
            spacing: {
                'side-gap': '94px'
            },
            fontFamily: {
                "bold": 'segoe-bold',
                "light": 'segoe-light',
                "semibold": 'segoe-semibold',
                "italic": 'segoe-italic',
            }
        },
        'side-gap': '94px'
    },
    plugins: [],
}