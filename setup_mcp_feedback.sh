#!/bin/bash

echo "🚀 MCP Feedback Enhanced 安装脚本"
echo "=================================="

# 检查并安装 Homebrew
if ! command -v brew &> /dev/null; then
    echo "📦 正在安装 Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # 添加 Homebrew 到 PATH
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"
fi

# 安装 Python 3.12
echo "🐍 正在安装 Python 3.12..."
brew install python@3.12

# 更新 PATH
export PATH="/opt/homebrew/bin:$PATH"

# 安装 uv
echo "📦 正在安装 uv..."
/opt/homebrew/bin/python3.12 -m pip install uv

# 测试 mcp-feedback-enhanced
echo "🧪 正在测试 mcp-feedback-enhanced..."
uvx mcp-feedback-enhanced@latest version

# 启动 Web UI 测试
echo "🌐 启动 Web UI 测试..."
echo "请在浏览器中打开 http://localhost:8765"
FORCE_WEB=true uvx mcp-feedback-enhanced@latest test --web

echo "✅ 安装完成！"
echo ""
echo "📋 配置说明："
echo "1. 将 mcp_config.json 的内容添加到您的 Cursor/VS Code 配置中"
echo "2. 重启 Cursor/VS Code"
echo "3. 在对话中使用 @mcp-feedback-enhanced 来调用反馈工具" 