import os

# 생성할 디렉토리 구조
structure = {
    "luckyGPT": [
        "backend/app/routers",
        "backend/app/models",
        "backend/app/services",
        "frontend/src/pages",
        "frontend/src/components",
        "docs",
        "issue_templates"
    ]
}

# 기본 파일 생성 정보 (파일명: 내용)
base_files = {
    "luckyGPT/README.md": "# 🌟 LuckyGPT\n\nMBTI, 기분, 날씨 기반 AI 운세 봇입니다.",
    "luckyGPT/.gitignore": "node_modules/\n.env\n__pycache__/",
    "luckyGPT/LICENSE": "MIT License",
    "luckyGPT/backend/requirements.txt": "fastapi\nuvicorn\npython-jose\nsqlalchemy\nopenai\nrequests",
    "luckyGPT/frontend/package.json": '{\n  "name": "luckyGPT-frontend",\n  "version": "1.0.0"\n}',
    "luckyGPT/docs/prompt_examples.md": "# Prompt Examples\n\n> INFP + 흐림 + 우울 → 오늘은 내면을 돌아보기에 좋은 날입니다.",
    "luckyGPT/issue_templates/feature_request.md": "---\nname: Feature Request\nabout: Suggest a new feature for this project\ntitle: \"[Feature] \"\nlabels: enhancement\n---\n\n## 기능 설명\n\n## 구현 방식\n\n## 참고 자료",
    "luckyGPT/issue_templates/bug_report.md": "---\nname: Bug Report\nabout: File a bug\n---\n\n## 버그 내용\n\n## 재현 방법\n\n## 예상 원인",
}

# 디렉토리 생성
for root, paths in structure.items():
    for path in paths:
        full_path = os.path.join(root, path)
        os.makedirs(full_path, exist_ok=True)
        print(f"📁 Created directory: {full_path}")

# 파일 생성
for filepath, content in base_files.items():
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        print(f"📄 Created file: {filepath}")

print("\n✅ luckyGPT 초기 프로젝트 구조가 완성되었습니다!")
