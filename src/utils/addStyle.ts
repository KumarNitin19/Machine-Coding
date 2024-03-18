export const addStyle = (style: string) => {
  const Timeline = style;
  const styled = document.createElement("style");

  styled.innerHTML = Timeline;
  document.head.appendChild(styled);
};
