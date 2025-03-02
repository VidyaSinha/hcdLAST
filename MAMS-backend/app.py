from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
import jwt
import datetime
from supabase import create_client, Client
import os
from werkzeug.utils import secure_filename
import uuid
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# 🔹 Enable CORS for multiple frontend origins
CORS(app, resources={r"/*": {"origins": ["http://localhost:8080", "http://localhost:8081", "http://127.0.0.1:3000"]}}) 

# 🔹 PostgreSQL Connection (Aiven)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('DATABASE_URL')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')
db = SQLAlchemy(app)

# 🔹 User Model
class User(db.Model):
    email = db.Column(db.String(100), primary_key=True)  # Primary key is email
    password = db.Column(db.String(255), nullable=False)

# 🔹 Student Model (No 'id' field)
class Student(db.Model):
    gr_no = db.Column(db.String(20), primary_key=True)  # GR number as primary key
    name = db.Column(db.String(100), nullable=False)
    enroll_no = db.Column(db.String(50), unique=True, nullable=False)
    academic_year = db.Column(db.String(20), nullable=False)

# 🔹 Placement Model
class Placement(db.Model):
    __tablename__ = 'placement'
    gr_no = db.Column(db.String(20), db.ForeignKey('student.gr_no'), primary_key=True)
    after_graduation = db.Column(db.String(100), nullable=False)
    doc_proof_url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

# 🔹 Enrollment Ratio Model
class EnrollmentRatio(db.Model):
    __tablename__ = 'enrollment_ratio'
    gr_no = db.Column(db.String(20), db.ForeignKey('student.gr_no'), primary_key=True)
    registration_form_url = db.Column(db.String(255), nullable=False)
    marks10_url = db.Column(db.String(255), nullable=False)
    marks12_url = db.Column(db.String(255), nullable=False)
    gujcet_marksheet_url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

# Supabase configuration


supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# 🔹 Register API
@app.route("/api/auth/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data received"}), 400

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Missing email or password"}), 400

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"error": "User already exists"}), 400

        hashed_password = generate_password_hash(password, method="pbkdf2:sha256")
        new_user = User(email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🔹 Login API
@app.route("/api/auth/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data received"}), 400

        email = data.get("email")
        password = data.get("password")

        user = User.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password, password):
            return jsonify({"error": "Invalid credentials"}), 401

        # Generate JWT Token (Fixed datetime issue)
        token = jwt.encode(
            {"email": user.email, "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)},
            app.config["SECRET_KEY"], algorithm="HS256"
        )

        return jsonify({"message": "Login successful", "token": token}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🔹 Add Student API
@app.route("/api/students", methods=["POST"])
def add_student():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data received"}), 400

        gr_no = data.get("gr_no")
        name = data.get("name")
        enroll_no = data.get("enroll_no")
        academic_year = data.get("academic_year")

        if not all([gr_no, name, enroll_no, academic_year]):
            return jsonify({"error": "Missing student details"}), 400

        # Check if the student already exists
        existing_student = Student.query.filter(
            (Student.gr_no == gr_no) | (Student.enroll_no == enroll_no)
        ).first()
        
        if existing_student:
            return jsonify({"error": "Student already exists with this GR number or enrollment number"}), 400

        new_student = Student(gr_no=gr_no, name=name, enroll_no=enroll_no, academic_year=academic_year)
        db.session.add(new_student)
        db.session.commit()

        return jsonify({"message": "Student added successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# 🔹 Get All Students API (without filtering)
@app.route("/api/students/all", methods=["GET"])
def get_all_students():
    try:
        # Get all students without any filtering
        students = Student.query.all()
        student_list = [{"gr_no": student.gr_no} for student in students]
        return jsonify(student_list), 200
    except Exception as e:
        print(f"Error in get_all_students: {str(e)}")
        return jsonify({"error": str(e)}), 500

# 🔹 Get Available Students for Placement API
@app.route("/api/students", methods=["GET"])
def get_students():
    try:
        # First, get all GR numbers that already have placement records
        existing_placements = Placement.query.with_entities(Placement.gr_no).all()
        existing_gr_numbers = {p[0] for p in existing_placements}  # Convert to set for faster lookup
        
        # Get all students whose GR numbers are not in placement records
        available_students = Student.query.filter(~Student.gr_no.in_(existing_gr_numbers)).all()
        
        # Convert to list of student objects with gr_no and name
        students_list = [{"gr_no": student.gr_no, "name": student.name} for student in available_students]
        
        return jsonify(students_list), 200
    except Exception as e:
        print(f"Error in get_students: {str(e)}")
        return jsonify({"error": str(e)}), 500

# 🔹 Get Available Students for Document Upload API
@app.route("/api/students/available-for-documents", methods=["GET"])
def get_available_students_for_documents():
    try:
        # Get students who don't have documents uploaded yet
        students = db.session.query(Student).outerjoin(
            EnrollmentRatio, Student.gr_no == EnrollmentRatio.gr_no
        ).filter(EnrollmentRatio.gr_no == None).all()
        
        return jsonify([{
            "gr_no": student.gr_no,
            "name": student.name
        } for student in students])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🔹 Placement Details Upload API
@app.route("/api/placement-details", methods=["POST"])
def upload_placement_details():
    try:
        print("Received placement details upload request")
        
        if 'proof' not in request.files:
            print("No proof file in request")
            return jsonify({"error": "No file provided"}), 400
            
        file = request.files['proof']
        gr_no = request.form.get('gr_no')
        after_graduation = request.form.get('status')
        
        print(f"Received data - GR: {gr_no}, Status: {after_graduation}")
        
        if not file or not gr_no or not after_graduation:
            print(f"Missing fields - File: {bool(file)}, GR: {bool(gr_no)}, Status: {bool(after_graduation)}")
            return jsonify({"error": "Missing required fields"}), 400
            
        # Check for allowed file types
        allowed_extensions = {'.pdf', '.jpg', '.jpeg', '.png'}
        file_extension = os.path.splitext(file.filename)[1].lower()
        if file_extension not in allowed_extensions:
            return jsonify({"error": "Only PDF and image files (JPG, JPEG, PNG) are allowed"}), 400
            
        try:
            # Generate unique filename with GR number and status for better tracking
            unique_filename = f"{gr_no}_{after_graduation}_{uuid.uuid4()}{file_extension}"
            file_path = f"placement_proofs/{unique_filename}"
            
            # Read file content
            file_content = file.read()
            
            # Set content type based on file extension
            content_type = "application/pdf" if file_extension == '.pdf' else f"image/{file_extension[1:]}"
            
            # Upload to Supabase Storage with content type
            supabase.storage.from_("documents").upload(
                file_path,
                file_content,
                file_options={
                    "content-type": content_type,
                    "cacheControl": "3600"
                }
            )
            
            # Get the public URL - construct it properly
            bucket_name = "documents"
            file_url = f"{SUPABASE_URL}/storage/v1/object/public/{bucket_name}/{file_path}"
            
            print(f"File uploaded successfully to Supabase. URL: {file_url}")
            
            # Check if placement record already exists
            existing_placement = Placement.query.get(gr_no)
            if existing_placement:
                # If there's an old file, try to delete it
                try:
                    # Extract the full path from the URL
                    old_url_parts = existing_placement.doc_proof_url.split("/")
                    old_file_path = "placement_proofs/" + old_url_parts[-1]
                    print(f"Attempting to delete old file: {old_file_path}")
                    supabase.storage.from_("documents").remove([old_file_path])
                except Exception as e:
                    print(f"Warning: Could not delete old file: {e}")
                
                # Update existing record
                existing_placement.after_graduation = after_graduation
                existing_placement.doc_proof_url = file_url
            else:
                # Create new placement record
                new_placement = Placement(
                    gr_no=gr_no,
                    after_graduation=after_graduation,
                    doc_proof_url=file_url
                )
                db.session.add(new_placement)
            
            db.session.commit()
            
            return jsonify({
                "message": "Placement details uploaded successfully",
                "file_url": file_url
            }), 201
            
        except Exception as upload_error:
            print(f"Error during file upload or database save: {str(upload_error)}")
            raise upload_error
        
    except Exception as e:
        print(f"Error in upload_placement_details: {str(e)}")
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# 🔹 Upload Documents API
@app.route("/api/documents/upload", methods=["POST"])
def upload_documents():
    try:
        gr_no = request.form.get('gr_no')
        if not gr_no:
            return jsonify({"error": "GR number is required"}), 400

        # Check if student exists
        student = Student.query.get(gr_no)
        if not student:
            return jsonify({"error": "Student not found"}), 404

        # Check if documents already uploaded
        existing_entry = EnrollmentRatio.query.get(gr_no)
        if existing_entry:
            return jsonify({"error": "Documents already uploaded for this student"}), 400

        required_files = ['registration_form', 'marks10', 'marks12', 'gujcet']
        urls = {}

        # Allowed file extensions
        ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}

        def allowed_file(filename):
            return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

        # Upload each file to Supabase
        for file_key in required_files:
            if file_key not in request.files:
                return jsonify({"error": f"Missing {file_key} file"}), 400

            file = request.files[file_key]
            if not file.filename:
                return jsonify({"error": f"No {file_key} file selected"}), 400

            if not allowed_file(file.filename):
                return jsonify({"error": f"Invalid file type for {file_key}. Allowed types: PDF, PNG, JPG, JPEG"}), 400

            # Secure filename and create unique path
            filename = secure_filename(file.filename)
            unique_filename = f"{uuid.uuid4()}_{filename}"
            file_path = f"enrollment/{gr_no}/{file_key}/{unique_filename}"

            # Upload to Supabase storage
            try:
                file_content = file.read()
                # Create the bucket if it doesn't exist
                try:
                    supabase.storage.create_bucket('documents')
                except:
                    pass  # Bucket might already exist

                # Upload file
                response = supabase.storage.from_('documents').upload(
                    file_path,
                    file_content,
                    {"content-type": file.content_type}  # Set correct content type
                )

                # Get public URL with content-type
                url = supabase.storage.from_('documents').get_public_url(file_path)
                urls[f"{file_key}_url"] = url

            except Exception as e:
                return jsonify({"error": f"Error uploading {file_key}: {str(e)}"}), 500

        # Create new enrollment ratio entry
        new_entry = EnrollmentRatio(
            gr_no=gr_no,
            registration_form_url=urls['registration_form_url'],
            marks10_url=urls['marks10_url'],
            marks12_url=urls['marks12_url'],
            gujcet_marksheet_url=urls['gujcet_url']
        )

        db.session.add(new_entry)
        db.session.commit()

        return jsonify({
            "message": "Documents uploaded successfully",
            "urls": urls
        })

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# 🔹 Database Connection Test Route
@app.route("/api/test-db", methods=["GET"])
def test_db():
    try:
        db.session.execute("SELECT 1")  # Simple query to check connection
        return jsonify({"message": "Database connection successful"}), 200
    except Exception as e:
        return jsonify({"error": f"Database connection failed: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
