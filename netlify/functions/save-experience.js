const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
);

exports.handler = async (event) => {

    // =========================================
    // ONLY ALLOW POST
    // =========================================

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


    // =========================================
    // PROCESS REQUEST
    // =========================================

    try {

        const body = JSON.parse(event.body || "{}");


        // =========================================
        // GET ALL ANSWERS
        // =========================================

        const {
            name,

            q1,
            q2,
            q3,
            q4,
            q5,
            q6,
            q7,
            q8,
            q9,

            relationship_choice,

            final_choice,

            extra_message

        } = body;


        // =========================================
        // VALIDATE NAME
        // =========================================

        if (!name || !name.trim()) {

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


        // =========================================
        // SAVE TO SUPABASE
        // =========================================

        const { data, error } = await supabase
            .from("experience_answers")
            .insert([
                {

                    name: name.trim(),

                    q1: q1 || null,
                    q2: q2 || null,
                    q3: q3 || null,
                    q4: q4 || null,
                    q5: q5 || null,
                    q6: q6 || null,
                    q7: q7 || null,
                    q8: q8 || null,
                    q9: q9 || null,

                    relationship_choice:
                        relationship_choice || null,

                    final_choice:
                        final_choice || null,

                    extra_message:
                        extra_message || null

                }
            ])
            .select()
            .single();


        // =========================================
        // SUPABASE ERROR
        // =========================================

        if (error) {

            console.error(
                "❌ Supabase error:",
                error
            );

            return {
                statusCode: 500,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    success: false,
                    error: error.message
                })
            };

        }


        // =========================================
        // SUCCESS
        // =========================================

        console.log(
            "✅ Experience response saved:",
            data
        );


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
            "❌ Save response error:",
            error
        );


        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                success: false,
                error: error.message || "Internal server error"
            })
        };

    }

};