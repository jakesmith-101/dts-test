import { LitElement, html, css } from 'lit';
import { customElement, state, property, query } from 'lit/decorators.js';
import { TaskItem } from '../models/task';

@customElement('task-list')
export class TaskList extends LitElement {
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
    return html`
      <ul>
        ${items.map((item) =>
      html`
            <li
                class=${item.status ? 'completed' : ''}
                @click=${() => this.toggleCompleted(item)}>
              ${item.title}
              ${item.description}
            </li>`
    )}
      </ul>
    `;
  }

  toggleCompleted(item: TaskItem) {
    item.status = !item.status;
    this.requestUpdate();
  }

  @query('#newitem')
  input!: HTMLInputElement;
}