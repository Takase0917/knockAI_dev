<!-- <page>
    <actionBar title="写真撮影">
        <navigationButton text="戻る" android.systemIcon="ic_menu_back" tap="{{ goBack }}" />
    </actionBar>
    <gridLayout rows="auto, *, auto" class="p-4">
        <label row="0" text="写真で見積もり" class="text-xl font-bold mb-4" />
        <stackLayout row="1" class="text-center">
            <image src="{{ previewImage }}" class="preview-image" />
            <button text="写真を撮影" class="camera-btn" tap="{{ takePicture }}" />
            <button text="ギャラリーから選択" class="gallery-btn" tap="{{ selectFromGallery }}" />
        </stackLayout>
    </gridLayout>
</page>

<script lang="ts">
    let previewImage = "";

    function takePicture() {
        // カメラ撮影機能を実装予定
    }

    function selectFromGallery() {
        // ギャラリー選択機能を実装予定
    }

    function goBack() {
        // ナビゲーション処理を実装予定
    }
</script>

<style>
    .preview-image {
        width: 300;
        height: 300;
        border-radius: 8;
        margin: 20;
    }

    .camera-btn, .gallery-btn {
        margin: 10;
        padding: 10;
        background-color: #2196F3;
        color: white;
        border-radius: 4;
    }
</style> -->