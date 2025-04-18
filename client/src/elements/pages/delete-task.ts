import { LitElement, html, css } from 'lit';
import { customElement, state, property, query } from 'lit/decorators.js';
import { TaskItem } from '../../models/task';

@customElement('delete-task')
export class DeleteTask extends LitElement {
  static styles = css`
    .completed {
      text-decoration-line: line-through;
      color: #777;
    }
  `;

  @state()
  private _listItems: TaskItem[] = [
    { id: 1, title: 'Make to-do list', status: true, due: new Date() },
    { id: 2, title: 'Complete Lit tutorial', status: false, due: new Date() }
  ];
  @property({ type: Boolean })
  hideCompleted = false;

  render() {
    // TODO: Replace items definition.
    const items = this._listItems;
    // TODO: Define partial templates.
    return html`
      <h2>To Do</h2>
      <!-- TODO: Update expression. -->
      <input id="newitem" aria-label="New item">
      <button @click=${this.addToDo}>Add</button>
      <br>
      <label>
        <input type="checkbox"
          @change=${this.setHideCompleted}
          ?checked=${this.hideCompleted}>
        Hide completed
      </label>
    `;
  }

  toggleCompleted(item: TaskItem) {
    item.status = !item.status;
    this.requestUpdate();
  }

  setHideCompleted(e: Event) {
    this.hideCompleted = (e.target as HTMLInputElement).checked;
  }

  @query('#newitem')
  input!: HTMLInputElement;

  addToDo() {
    this._listItems = [...this._listItems,
    { id: this._listItems.length + 1, title: this.input.value, status: false, due: new Date() }];
    this.input.value = '';
  }
}