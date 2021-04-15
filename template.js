export default ({ markup, css }) => {
  return `
        <!DOCYPE html>
        <html lang="en">
            <head>
                <title>Socialize</title>
                <link rel="preconnect" href="https://fonts.gstatic.com">
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" 
                rel="stylesheet">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet">
                <style>
                    a {
                        text-decoration: none;
                        color: #061d95;
                    }
                </style>
            </head>
            <body>
                <div id="root">${markup}</div>
                <style id="jss-server-side>${css}</style>
                <script type="text/javascript" src="/dist/bundle.js"></script>
            </body>
        </html>
    `;
};
