<script lang="ts">
    let statusMessage = "見積もり作成の準備ができています";

    function onVoiceInput() {
        statusMessage = "音声入力を準備中...";
    }

    function onPhotoInput() {
        statusMessage = "カメラを起動中...";
    }

    function onHistoryView() {
        statusMessage = "履歴を読み込み中...";
    }

    function showHelp() {
        console.log("Help clicked");
    }

    function showSettings() {
        console.log("Settings clicked");
    }
</script>

<div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-center text-secondary">木製建具見積もりAI</h1>
    
    <!-- Status Indicator -->
    <div class="info card mb-4">
        <span class="text-lg mr-2">🔔</span>
        <p class="status-text">{statusMessage}</p>
    </div>
    
    <!-- Main Menu Cards -->
    <div class="menu mb-4">
        <button class="card btn-hover" on:click={onVoiceInput}>
            🎤 音声入力で見積もり
        </button>
        <button class="card btn-hover" on:click={onPhotoInput}>
            📸 写真で見積もり
        </button>
        <button class="card btn-hover" on:click={onHistoryView}>
            📋 見積履歴
        </button>
    </div>
    
    <!-- Quick Actions -->
    <div class="quick-actions mt-4">
        <button class="btn btn-secondary" on:click={showHelp}>ヘルプ</button>
        <button class="btn btn-secondary" on:click={showSettings}>設定</button>
    </div>
</div>
