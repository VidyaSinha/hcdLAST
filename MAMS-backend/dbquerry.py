import psycopg2



try:

    cursor = conn.cursor()
    print("Connected to Aiven PostgreSQL successfully!")

    # 1. Create enrollment_ratio table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS enrollment_ratio (
        ratio_id SERIAL PRIMARY KEY,
        academic_year VARCHAR(30) NOT NULL,
        N INT NOT NULL,      
        N1 INT NOT NULL,     
        enrollment_ratio DECIMAL(5,2) GENERATED ALWAYS AS ((N1::DECIMAL / NULLIF(N, 0)) * 100) STORED
    );
    """)
    print("Table enrollment_ratio created successfully.")
 # 4. Create departments table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS departments (
        department_id SERIAL PRIMARY KEY,
        department_name VARCHAR(100) NOT NULL
    );
    """)
    print("Table departments created successfully.")

    # 2. Create students table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS students (
        student_id SERIAL PRIMARY KEY,
        student_name VARCHAR(100) NOT NULL,
        enrollment_year VARCHAR(10) NOT NULL,
        department_id INT,
        FOREIGN KEY (department_id) REFERENCES departments(department_id)
    );
    """)
    print("Table students created successfully.")



    # 3. Create courses table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS courses (
        course_id SERIAL PRIMARY KEY,
        course_name VARCHAR(100) NOT NULL,
        department_id INT,
        FOREIGN KEY (department_id) REFERENCES departments(department_id)
    );
    """)
    print("Table courses created successfully.")

   
    # 5. Create faculty table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS faculty (
        faculty_id SERIAL PRIMARY KEY,
        faculty_name VARCHAR(100) NOT NULL,
        department_id INT,
        FOREIGN KEY (department_id) REFERENCES departments(department_id)
    );
    """)
    print("Table faculty created successfully.")

    # 6. Create admissions table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS admissions (
        admission_id SERIAL PRIMARY KEY,
        student_id INT,
        course_id INT,
        admission_date DATE NOT NULL,
        FOREIGN KEY (student_id) REFERENCES students(student_id),
        FOREIGN KEY (course_id) REFERENCES courses(course_id)
    );
    """)
    print("Table admissions created successfully.")

    

    # Insert sample data into enrollment_ratio
    cursor.execute("""
    INSERT INTO enrollment_ratio (academic_year, N, N1) VALUES
    ('2024-25 (CAY)', 60, 60),
    ('2023-24 (CAYm1)', 60, 60),
    ('2022-23 (CAYm2)', 60, 42)
    ON CONFLICT DO NOTHING;
    """)
    print("Sample data inserted into enrollment_ratio successfully.")

    conn.commit()

    # Fetch and Display Enrollment Data
    cursor.execute("SELECT academic_year, N, N1, enrollment_ratio || '%' FROM enrollment_ratio;")
    rows = cursor.fetchall()
    print("\nEnrollment Ratio Data:")
    for row in rows:
        print(row)

except Exception as e:
    print("Error:", e)

finally:
    if conn:
        cursor.close()
        conn.close()
        print("Database connection closed.")