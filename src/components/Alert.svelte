<script lang="ts">
    export let message: string;
    export let type: 'success' | 'error' | 'info' = 'info';
    export let onClose: () => void;
  </script>
  
  <div class={`alert alert-${type} p-4 rounded-md shadow-md flex justify-between items-center`}>
    <span>{message}</span>
    <button on:click={onClose} class="ml-4 text-white font-bold">×</button>
  </div>
  
  <style>
    .alert {
      background-color: var(--color-surface);
      color: var(--color-secondary);
    }
    .alert-success {
      background-color: #4caf50;
      color: white;
    }
    .alert-error {
      background-color: #f44336;
      color: white;
    }
    .alert-info {
      background-color: #2196f3;
      color: white;
    }
  </style>