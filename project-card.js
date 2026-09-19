const html = String.raw
const css = String.raw

const escape = (s) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

const styles = css`
	:host {
		display: block;
		padding: 1em;
		border: 1px solid var(--card-border-color, #737373);
	}
	h2, h3, div {
		margin: 0 0 0.5em;
	}
	h2 {
		color: var(--card-title-color, currentColor);
	}
	a {
		color: var(--card-link-color, #1d4ed8);
	}
	.release {
		color: var(--card-release-color, #1d4ed8);
	}
`

const template = ({name, release}) => html`
	<style>${styles}</style>
	<h2 part="title">
		${name ? `Project ${escape(name)}:` : "Project"}
	</h2>
	${release ? html`
	<h3 part="release-heading">
		<b>Release:</b>
		<span class="release" part="release">${escape(release)}</span>
	</h3>
	` : ""}
	<div part="details">project details...</div>
	<a href="#" part="link">Link</a>
`

export class ProjectCard extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({mode: "open"})
	}

	connectedCallback() {
		this.shadowRoot.innerHTML = template({
			name: this.getAttribute("name"),
			release: this.getAttribute("release"),
		})
	}
}
