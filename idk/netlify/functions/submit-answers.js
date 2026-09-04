const { createClient } = require("@supabase/supabase-js");

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

        const {
            name,
            q1,
            q2,
            q3,
            q4,
            q5,
            final_choice,
            extra_message
        } = JSON.parse(event.body || "{}");


        /* =====================================
           VALIDATION
           ===================================== */

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


        /* =====================================
           SUPABASE
           ===================================== */

        const supabaseUrl =
            process.env.SUPABASE_URL;

        const supabaseKey =
            process.env.SUPABASE_SERVICE_ROLE_KEY;


        if (!supabaseUrl || !supabaseKey) {

            console.error(
                "Supabase environment variables are missing."
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


        const supabase =
            createClient(
                supabaseUrl,
                supabaseKey
            );


        /* =====================================
           SAVE ANSWERS
           ===================================== */

        const { data, error } =
            await supabase
                .from("experience_answers")
                .insert({
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
                .select();


        /* =====================================
           DATABASE ERROR
           ===================================== */

        if (error) {

            console.error(
                "Supabase insert error:",
                error
            );

            return {
                statusCode: 500,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    success: false,
                    error: "Could not save answers"
                })
            };

        }


        /* =====================================
           SUCCESS
           ===================================== */

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                success: true,
                message: "Answers saved successfully",
                data: data
            })
        };


    } catch (error) {

        console.error(
            "Submit answer error:",
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