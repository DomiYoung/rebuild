# 🎯 MCP Feedback Enhanced 集成指南

## 📋 概述

[mcp-feedback-enhanced](https://github.com/Minidoracat/mcp-feedback-enhanced.git) 是一个交互式用户反馈的 MCP 工具，支持 Web UI 模式，特别适合 SSH Remote 环境。

## 🚀 快速开始

### 1. 环境准备

由于 mcp-feedback-enhanced 需要 Python 3.11+，请先升级 Python：

```bash
# 赋予脚本执行权限并运行
chmod +x setup_mcp_feedback.sh
./setup_mcp_feedback.sh
```

### 2. MCP 服务器配置

将以下配置添加到您的 Cursor/VS Code 的 `settings.json` 中：

```json
{
  "mcp": {
    "mcpServers": {
      "mcp-feedback-enhanced": {
        "command": "uvx",
        "args": ["mcp-feedback-enhanced@latest"],
        "timeout": 600,
        "env": {
          "FORCE_WEB": "true",
          "MCP_DEBUG": "false",
          "MCP_WEB_PORT": "8765"
        },
        "autoApprove": ["interactive_feedback"]
      }
    }
  }
}
```

## 🌐 Web UI 功能特性

### ✨ 核心功能
- **交互式反馈收集**: 实时获取用户反馈
- **Web 界面**: 现代化的 Web UI，支持远程访问
- **图像上传**: 支持截图和图片反馈
- **键盘快捷键**: `Ctrl+Enter` 提交反馈
- **自动对焦**: 打开时自动聚焦输入框

### 🔧 环境变量配置

| 变量名 | 用途 | 可选值 | 默认值 |
|--------|------|--------|--------|
| `FORCE_WEB` | 强制使用 Web UI | true/false | false |
| `MCP_DEBUG` | 调试模式 | true/false | false |
| `MCP_WEB_PORT` | Web UI 端口 | 1024-65535 | 8765 |

## 📝 使用方法

### 在 AI 对话中调用

```
@mcp-feedback-enhanced 请收集用户对当前功能的反馈
```

### Prompt 工程设置

建议在 AI 助手中添加以下规则：

```
# MCP 交互式反馈规则

1. 在任何流程、任务或对话过程中，无论是询问、回应还是完成阶段任务，都必须调用 MCP mcp-feedback-enhanced。
2. 收到用户反馈时，如果反馈内容不为空，必须再次调用 MCP mcp-feedback-enhanced 并根据反馈调整行为。
3. 只有当用户明确表示"结束"或"不需要更多交互"时，才能停止调用 MCP mcp-feedback-enhanced。
4. 除非收到结束命令，否则所有步骤都必须重复调用 MCP mcp-feedback-enhanced。
5. 完成任务前，使用 MCP mcp-feedback-enhanced 询问用户反馈。
```

## 🛠️ 测试和验证

### 命令行测试
```bash
# 版本检查
uvx mcp-feedback-enhanced@latest version

# Web UI 测试
FORCE_WEB=true uvx mcp-feedback-enhanced@latest test --web
```

### 浏览器访问
- 默认地址: http://localhost:8765
- 自定义端口: http://localhost:{MCP_WEB_PORT}

## 🔍 故障排除

### 常见问题

1. **Python 版本不兼容**
   - 错误: `Python>=3.11 required`
   - 解决: 运行 `setup_mcp_feedback.sh` 升级 Python

2. **Web UI 无法启动**
   - 检查端口是否被占用
   - 设置 `FORCE_WEB=true` 环境变量

3. **MCP 连接失败**
   - 重启 Cursor/VS Code
   - 检查 MCP 工具状态（绿灯）

4. **浏览器无法访问**
   - 检查防火墙设置
   - 确认端口转发配置

### SSH Remote 环境

如果在 SSH Remote 环境中：
1. Web UI 会自动启动
2. 需要在本地浏览器中手动打开 URL
3. 可能需要配置端口转发

## 📊 集成效果

成功集成后，您将获得：
- ✅ 实时用户反馈收集
- ✅ 直观的 Web 界面
- ✅ 图像上传支持
- ✅ 键盘快捷键操作
- ✅ SSH Remote 环境支持

## 🔗 相关链接

- 项目地址: https://github.com/Minidoracat/mcp-feedback-enhanced.git
- 文档: 项目内 `docs/` 目录
- 问题反馈: GitHub Issues

---

**🌟 开始使用 MCP Feedback Enhanced，提升您的开发体验！** 