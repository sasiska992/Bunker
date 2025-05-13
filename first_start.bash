cd backend

if [ ! -d "venv" ]; then
    echo "- Creating virtual environment..."
    python3 -m venv venv
    echo "- Environment created!"
else
    echo "- Virtual environment already exists!"
fi

echo "- Installing front-end dependencies..."
cd ..
cd front
npm install > /dev/null
echo "- Front-end dependencies installed!"
cd ..
cd backend

source venv/bin/activate

echo "- Installing requirements..."
pip install -r requirements.txt --no-cache-dir --progress-bar=on > /dev/null
echo "- Requirements installed!"

echo "- Starting server..."
uvicorn app:app --reload

echo "- Bye!"
