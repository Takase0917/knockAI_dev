<!-- <page>
    <actionBar title="音声入力">
        <navigationButton text="戻る" android.systemIcon="ic_menu_back" tap="{{ goBack }}" />
    </actionBar>
    <gridLayout rows="auto, *, auto" class="p-4">
        <label row="0" text="音声入力で見積もり" class="text-xl font-bold mb-4" />
        <stackLayout row="1" class="text-center">
            <label text="{{ recordingStatus }}" class="text-lg" />
            <button text="{{ isRecording ? '録音停止' : '録音開始' }}" 
                    class="record-btn {{ isRecording ? 'recording' : '' }}" 
                    tap="{{ toggleRecording }}" />
        </stackLayout>
    </gridLayout>
</page>

<script lang="ts">
    let isRecording = false;
    let recordingStatus = "録音ボタンを押して開始してください";

    function toggleRecording() {
        isRecording = !isRecording;
        recordingStatus = isRecording ? "録音中..." : "録音が完了しました";
    }

    function goBack() {
        // ナビゲーション処理を実装予定
    }
</script>

<style>
    .record-btn {
        width: 100;
        height: 100;
        border-radius: 50;
        background-color: #ff4081;
        color: white;
        margin: 20;
    }

    .recording {
        background-color: #f44336;
        animation: pulse 1s infinite;
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
</style> -->