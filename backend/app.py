from flask import Flask, request, jsonify

app = Flask(__name__)

# Expected ROM ranges per injury + week
EXPECTED_ROM = {
    "knee": {
        "week1": {"min": 10, "max": 30},
        "week2": {"min": 25, "max": 45},
        "week3": {"min": 40, "max": 60},
        "week4": {"min": 55, "max": 80},
    }
}
"""
@app.route("/recommend-week", methods=["POST"])
def recommend_week():
    data = request.json

    injury = data["injury"]
    actual_rom = data["actualROM"]
    reported_week = data["reportedWeek"]

    injury_data = EXPECTED_ROM.get(injury)

    if not injury_data:
        return jsonify({"error": "Unknown injury"}), 400

    # Default recommendation
    recommended = "week1"

    for week, rom_range in injury_data.items():
        if actual_rom >= rom_range["min"]:
            recommended = week

    return jsonify({
        "recommendedWeek": recommended,
        "actualROM": actual_rom,
        "reportedWeek": reported_week
    })"""

#if __name__ == "__main__":
#    app.run(debug=True)


#database handeling 
import sqlite3

app = Flask(__name__)
DB = "database.db"

def query_db(query, args=(), one=False):
    conn = sqlite3.connect(DB)
    cur = conn.cursor()
    cur.execute(query, args)
    rv = cur.fetchall()
    conn.commit()
    conn.close()
    return (rv[0] if rv else None) if one else rv


@app.route("/api/recovery", methods=["POST"])
def save_recovery():
    data = request.json

    max_angle = data["max_angle"]
    joint = data["joint"]
    user_id = data["user_id"]

    # Simple logic: map angle → week
    if max_angle < 30:
        week = 1
    elif max_angle < 60:
        week = 2
    else:
        week = 3

    query_db(
        """
        INSERT INTO recovery_tests (user_id, joint, max_angle, recommended_week)
        VALUES (?, ?, ?, ?)
        """,
        (user_id, joint, max_angle, week)
    )

    return jsonify({ "recommendedWeek": week })
@app.route("/api/session", methods=["POST"])
def save_session():
    data = request.json
    user_id = data["user_id"]
    week = data["week"]



    """query_db(
        "INSERT INTO exercise_sessions (user_id, week) VALUES (?, ?)",
        (user_id, week)
    )

    return jsonify({ "status": "session started" })
@app.route("/api/exercise-log", methods=["POST"])
def save_exercise_log():
    data = request.json

    query_db(
        "
        INSERT INTO exercise_logs
        (session_id, exercise_name, reps_completed, reps_target, success_rate, avg_angle, feedback)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ",
        (
            data["session_id"],
            data["exercise_name"],
            data["reps_completed"],
            data["reps_target"],
            data["success_rate"],
            data["avg_angle"],
            data["feedback"]
        )
    )

    return jsonify({ "status": "logged" })
    """