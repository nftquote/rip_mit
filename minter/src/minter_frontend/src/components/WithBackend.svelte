<div>
  <p>with backend: {greet}</p>
  <input type="text" value={query} on:change={(e) => updateQuery(e.target.value)}>
  <button type="button" on:click={submit}>submit</button>
</div>

<script>
  import { backend } from '../common/client'

  let greet = '';
  let query = '';

  function updateQuery(q) {
    query = q;
  }

  async function submit() {
    greet = await backend.greet(query);
  }
</script>