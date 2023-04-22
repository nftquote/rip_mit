<div class="mint-form">
  <input
    class="field-phrase"
    type="text"
    value={phrase}
    placeholder="Enter the phrase you want to leave"
    on:change={(e) => updatePhrase(e.target.value)}
  >
  <button
    class="btn-submit"
    type="button"
    on:click={submit}
  >Submit</button>
</div>

<script>
  import { backend } from '../common/client'

  let phrase = '';

  function updatePhrase(p) {
    phrase = p;
  }

  async function submit() {
    const result = await backend.generate_asset({
      phrase,
    });

    console.log(result);
  }
</script>

<style>
  .field-phrase {
    display: block;
  }
  .btn-submit {
    display: block;
  }
</style>