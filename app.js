import { portfolio } from "./data.js";

const byId = (id) => document.getElementById(id);
const element = (tag, className, content) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content) node.textContent = content;
  return node;
};

const [firstName, ...lastNames] = portfolio.name.split(" ");
const title = byId("hero-title");
title.append(element("span", "", firstName));
const secondLine = element("span", "", lastNames.join(" "));
secondLine.append(element("span", "name-dot", "."));
title.append(secondLine);

byId("hero-role").textContent = portfolio.role;
byId("hero-year").textContent = `Portofolio / ${new Date().getFullYear()}`;
byId("header-location").textContent = portfolio.location;
byId("hero-intro").textContent = portfolio.intro;
byId("about-copy").textContent = portfolio.about;
byId("current-focus").textContent = portfolio.focus;
byId("contact-message").textContent = `${portfolio.availability.primary} ${portfolio.availability.secondary}`;

const emailHref = `mailto:${portfolio.links.email}?subject=${encodeURIComponent("Peluang role Software Engineer")}`;
const heroActions = byId("hero-actions");
const primaryAction = element("a", "hero-action hero-action-primary", portfolio.cta.primary);
primaryAction.href = emailHref;
const secondaryAction = element("a", "hero-action hero-action-secondary", portfolio.cta.secondary);
secondaryAction.href = "#work";
heroActions.append(primaryAction, secondaryAction);

const contributionList = (items) => {
  const list = element("ul", "project-contributions");
  items.forEach((item) => list.append(element("li", "", item)));
  return list;
};

const projectDetail = (className, title, content, list = false) => {
  const detail = element("section", className);
  detail.append(element("h4", `${className}-title`, title));
  if (list) {
    const scope = element("ul", `${className}-scope`);
    content.forEach((item) => scope.append(element("li", "", item)));
    detail.append(scope);
  } else {
    detail.append(element("p", "", content));
  }
  return detail;
};

const projects = portfolio.projects;
const featured = projects.find((project) => project.featured) ?? projects[0];
if (featured) {
  const card = element("article", "featured-project");
  const main = element("div", "feature-main");
  main.append(element("p", "feature-label", `Karya pilihan / ${featured.type}`));
  main.append(element("p", "feature-name", featured.displayTitle ?? featured.title));
  const info = element("div", "feature-info");
  const description = element("div");
  description.append(element("h3", "", featured.title));
  description.append(element("p", "", featured.summary));
  if (featured.outcome) description.append(element("p", "feature-outcome", featured.outcome));
  const details = element("div", "feature-details");
  if (featured.scope?.length) details.append(projectDetail("feature-detail", "Cakupan sistem", featured.scope, true));
  if (featured.ownership) details.append(projectDetail("feature-detail", "Kontribusi", featured.ownership));
  const stack = element("div", "feature-stack", featured.stack);
  info.append(description, details, stack);
  card.append(main, info);
  byId("featured-project").append(card);
}

const list = byId("projects-list");
const supporting = projects.filter((project) => project !== featured);
if (!supporting.length && !featured) list.append(element("p", "empty-message", "Karya belum ditambahkan."));
supporting.forEach((project, index) => {
  const row = element("article", "project-row");
  row.append(element("span", "project-index", String(index + 2).padStart(2, "0")));
  const body = element("div");
  if (project.context) body.append(element("p", "project-context", project.context));
  body.append(element("h3", "", project.title), element("p", "", project.summary));
  if (project.scope?.length || project.ownership) {
    const details = element("div", "project-details");
    if (project.scope?.length) details.append(projectDetail("project-detail", "Cakupan sistem", project.scope, true));
    if (project.ownership) details.append(projectDetail("project-detail", "Kontribusi", project.ownership));
    body.append(details);
  }
  if (project.contributions?.length) body.append(contributionList(project.contributions));
  const meta = element("div", "project-meta");
  meta.append(element("strong", "", project.type), element("span", "", project.stack));
  row.append(body, meta);
  list.append(row);
});

const timeline = byId("experience-list");
if (!portfolio.experience.length) timeline.append(element("p", "empty-message", "Pengalaman belum ditambahkan."));
portfolio.experience.forEach((item) => {
  const row = element("article", "timeline-row");
  row.append(element("span", "timeline-period", item.period));
  const body = element("div");
  body.append(
    element("h3", "", item.role),
    element("p", "timeline-company", item.company)
  );
  if (item.summary) body.append(element("p", "timeline-summary", item.summary));
  row.append(body);
  timeline.append(row);
});

const skills = byId("skills-list");
portfolio.skills.forEach((skill) => skills.append(element("li", "", skill)));

const email = byId("email-link");
email.href = `mailto:${portfolio.links.email}`;
email.textContent = portfolio.links.email;

const socials = byId("social-links");
[
  ["LinkedIn", portfolio.links.linkedin],
  ["GitHub", portfolio.links.github],
  ["CV", portfolio.links.cv]
].forEach(([label, url]) => {
  if (!url) return;
  const link = element("a", "", label);
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  socials.append(link);
});

byId("phone-number").textContent = portfolio.links.phone;
byId("footer-copy").textContent = `Dibuat dengan waktu luang oleh ${portfolio.name}. © ${new Date().getFullYear()}`;
