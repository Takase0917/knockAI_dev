<page>
    <actionBar title="木製建具見積もりAI" class="action-bar" />
    <scrollView>
        <stackLayout class="p-6">
            <label text="木製建具見積もりAI" class="text-2xl font-bold mb-6 text-center text-secondary" />
            
            <!-- Status Indicator -->
            <gridLayout rows="auto" columns="auto, *" class="info card mb-4">
                <label col="0" text="🔔" class="text-lg mr-2" />
                <label col="1" text="{{ statusMessage }}" class="status-text" textWrap="true" />
            </gridLayout>
            
            <!-- Main Menu Cards -->
            <gridLayout rows="auto, auto, auto" columns="*" class="mb-4">
                <stackLayout row="0" class="card btn-hover" tap="{{ onVoiceInput }}">
                    <label text="🎤 音声入力で見積もり" class="text-lg font-bold text-secondary" />
                    <label text="音声で仕様を説明して見積もりを作成" class="text-sm text-secondary opacity-70" textWrap="true" />
                </stackLayout>
                
                <stackLayout row="1" class="card btn-hover" tap="{{ onPhotoInput }}">
                    <label text="📸 写真で見積もり" class="text-lg font-bold text-secondary" />
                    <label text="建具の写真をアップロードして見積もりを作成" class="text-sm text-secondary opacity-70" textWrap="true" />
                </stackLayout>
                
                <stackLayout row="2" class="card btn-hover" tap="{{ onHistoryView }}">
                    <label text="📋 見積履歴" class="text-lg font-bold text-secondary" />
                    <label text="過去の見積もり履歴を確認" class="text-sm text-secondary opacity-70" textWrap="true" />
                </stackLayout>
            </gridLayout>
            
            <!-- Quick Actions -->
            <gridLayout rows="auto" columns="*, *" class="mt-4">
                <button col="0" text="ヘルプ" class="btn btn-secondary" tap="{{ showHelp }}" />
                <button col="1" text="設定" class="btn btn-secondary" tap="{{ showSettings }}" />
            </gridLayout>
        </stackLayout>
    </scrollView>
</page>

<script lang="ts">
    let statusMessage = "見積もり作成の準備ができています";
    
    function showHelp() {
        // Help dialog implementation
    }
    
    function showSettings() {
        // Settings dialog implementation
    }

    function onVoiceInput() {
        statusMessage = "音声入力を準備中...";
        // Voice input implementation
    }

    function onPhotoInput() {
        statusMessage = "カメラを起動中...";
        // Photo input implementation
    }

    function onHistoryView() {
        statusMessage = "履歴を読み込み中...";
        // History view implementation
    }
</script>