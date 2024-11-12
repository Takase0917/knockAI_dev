<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  
  const dispatch = createEventDispatcher();
  let isRecording = false;
  let transcript = '';
  let recognition: any;
  
  onMount(() => {
    if ('webkitSpeechRecognition' in window) {
      recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'ja-JP';
      
      recognition.onresult = (event: any) => {
        transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map(result => result.transcript)
          .join('');
      };
    }
  });
  
  function toggleRecording() {
    if (!recognition) {
      alert('お使いのブラウザは音声入力に対応していません');
      return;
    }
    
    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
    }
    isRecording = !isRecording;
  }
</script>

<div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-xl font-bold mb-6">音声による仕様入力</h2>
  
  <div class="space-y-4">
    <div class="text-center">
      <button
        on:click={toggleRecording}
        class={`w-24 h-24 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-500'
        }`}
      >
        <span class="text-white">
          {isRecording ? '停止' : '録音'}
        </span>
      </button>
    </div>
    
    <div class="mt-6">
      <label class="block text-gray-700 mb-2">認識テキスト</label>
      <div class="w-full min-h-[100px] p-3 border rounded-md bg-gray-50">
        {transcript || '音声を認識するとここに表示されます'}
      </div>
    </div>
    
    <div class="flex justify-between pt-4">
      <button
        on:click={() => dispatch('back')}
        class="text-gray-600 hover:text-gray-800"
      >
        戻る
      </button>
      
      <button
        on:click={() => dispatch('next', { voiceData: transcript })}
        class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
      >
        次へ進む
      </button>
    </div>
  </div>
</div>