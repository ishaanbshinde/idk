exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                error: "Method not allowed"
            })
        };
    }

    try {
        const { name, password } = JSON.parse(event.body || "{}");

        const expectedName = process.env.ENTRY_NAME;
        const expectedPassword = process.env.ENTRY_PASSWORD;

        if (!name || !password) {
            return {
                statusCode: 400,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    success: false,
                    error: "Missing credentials"
                })
            };
        }

        /*
         * If the entered name isn't the intended name,
         * send the visitor to the harmless decoy site.
         */
        if (name.trim() !== expectedName) {
            return {
                statusCode: 401,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    success: false,
                    redirect: true
                })
            };
        }

        /*
         * If the intended person enters the wrong password,
         * show an incorrect-password message instead.
         */
        if (password !== expectedPassword) {
            return {
                statusCode: 401,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    success: false,
                    error: "Incorrect password"
                })
            };
        }

        /*
         * Correct credentials.
         */
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                success: true
            })
        };

    } catch (error) {
        console.error("Session start error:", error);

        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                success: false,
                error: "Internal server error"
            })
        };
    }
};