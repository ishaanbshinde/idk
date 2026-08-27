const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
);

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

        const body = JSON.parse(event.body || "{}");

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


        const { data, error } = await supabase
            .from("experience_answers")
            .insert([
                {
                    name: name,
                    q1: q1 || null,
                    q2: q2 || null,
                    q3: q3 || null,
                    q4: q4 || null,
                    q5: q5 || null,
                    final_choice: final_choice || null,
                    extra_message: extra_message || null
                }
            ])
            .select()
            .single();


        if (error) {

            console.error(
                "Supabase error:",
                error
            );

            return {
                statusCode: 500,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    success: false,
                    error: "Failed to save response"
                })
            };

        }


        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                success: true,
                message: "Response saved successfully",
                response: data
            })
        };


    } catch (error) {

        console.error(
            "Save response error:",
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