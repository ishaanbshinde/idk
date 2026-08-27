exports.handler = async (event) => {

    if (event.httpMethod !== "POST") {

        return {
            statusCode: 405,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                success: false,
                error: "Method not allowed"
            })
        };

    }


    try {

        const body =
            JSON.parse(event.body || "{}");


        const {
            name,
            q1,
            q2,
            q3,
            q4,
            q5,
            final_choice,
            extra_message
        } = body;


        /*
         * Required Supabase environment variables.
         *
         * DO NOT put the service-role key
         * inside your frontend JavaScript.
         */

        const supabaseUrl =
            process.env.SUPABASE_URL;

        const supabaseKey =
            process.env.SUPABASE_SERVICE_ROLE_KEY;


        if (!supabaseUrl || !supabaseKey) {

            console.error(
                "Missing Supabase environment variables."
            );

            return {
                statusCode: 500,

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    success: false,
                    error: "Server configuration error"
                })
            };

        }


        /*
         * Basic validation.
         */

        if (!name) {

            return {
                statusCode: 400,

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    success: false,
                    error: "Missing name"
                })
            };

        }


        /*
         * Insert the completed experience
         * into Supabase.
         */

        const response = await fetch(
            `${supabaseUrl}/rest/v1/experience_answers`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",

                    "apikey":
                        supabaseKey,

                    "Authorization":
                        `Bearer ${supabaseKey}`,

                    "Prefer":
                        "return=minimal"
                },

                body: JSON.stringify({
                    name: name,
                    q1: q1 || null,
                    q2: q2 || null,
                    q3: q3 || null,
                    q4: q4 || null,
                    q5: q5 || null,
                    final_choice:
                        final_choice || null,
                    extra_message:
                        extra_message || null
                })
            }
        );


        /*
         * Supabase rejected the insert.
         */

        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Supabase insert failed:",
                errorText
            );

            return {
                statusCode: 500,

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    success: false,
                    error: "Could not save experience"
                })
            };

        }


        /*
         * Everything worked.
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

    }


    catch (error) {

        console.error(
            "Save experience error:",
            error
        );


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