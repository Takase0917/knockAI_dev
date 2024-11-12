<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  const dispatch = createEventDispatcher();
  
  let dragActive = false;
  let files: FileList;
  let previewUrls: string[] = [];
  let isUploading = false;
  
  function handleDrop(e: DragEvent) {
    e.preventDefault();
    dragActive = false;
    
    if (e.dataTransfer?.files) {
      handleFiles(e.dataTransfer.files);
    }
  }
  
  function handleFiles(fileList: FileList) {
    files = fileList;
    previewUrls = [];
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previewUrls = [...previewUrls, reader.result as string];
      };
      reader.readAsDataURL(file);
    });
  }
  
  async function handleUpload() {
    isUploading = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    dispatch('next', { images: files });
    isUploading = false;
  }
</script>

<div class="max-w-2xl mx-auto" in:fly={{ y: 20, duration: 400, delay: 200 }} out:fade>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-6">画像アップロード</h2>
    
    <div
      class={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
        dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      on:dragenter|preventDefault={() => dragActive = true}
      on:dragleave|preventDefault={() => dragActive = false}
      on:dragover|preventDefault
      on:drop|preventDefault={handleDrop}
    >
      <div class="space-y-4">
        <div class="text-gray-600">
          画像をドラッグ＆ドロップ
          <br />
          または
        </div>
        
        <label class="inline-block">
          <span class="btn-hover bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer inline-block">
            ファイルを選択
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            class="hidden"
            on:change={(e) => handleFiles(e.target.files)}
          />
        </label>
      </div>
    </div>
    
    {#if previewUrls.length > 0}
      <div class="mt-6 grid grid-cols-2 gap-4">
        {#each previewUrls as url}
          <div
            class="relative aspect-video"
            in:fly={{ y: 20, duration: 300 }}
            out:fade
          >
            <img
              src={url}
              alt="プレビュー"
              class="w-full h-full object-cover rounded-md"
            />
          </div>
        {/each}
      </div>
    {/if}
    
    <div class="flex justify-between pt-6">
      <button
        on:click={() => dispatch('back')}
        class="btn-hover text-gray-600 hover:text-gray-800"
      >
        戻る
      </button>
      
      <button
        on:click={handleUpload}
        class="btn-hover bg-blue-500 text-white px-6 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!files?.length || isUploading}
      >
        {#if isUploading}
          <span class="loading-pulse">アップロード中...</span>
        {:else}
          見積り結果を表示
        {/if}
      </button>
    </div>
  </div>
</div>