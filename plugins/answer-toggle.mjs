// 授業終了後，講義ノートの {hidden-answer} を {visible-answer} に変更して公開する．
function createAnswerDirective(name, visible) {
  return {
    name,
    arg: {
      type: "myst",
    },
    options: {
      open: {
        type: Boolean,
      },
    },
    body: {
      type: "myst",
      required: true,
    },
    run(data) {
      if (!visible) {
        return [];
      }

      const children = [];
      if (data.arg) {
        children.push({ type: "summary", children: data.arg });
      }
      children.push(...data.body);

      return [
        {
          type: "details",
          open: data.options?.open,
          children,
        },
      ];
    },
  };
}

export default {
  name: "answer-toggle",
  directives: [
    createAnswerDirective("visible-answer", true),
    createAnswerDirective("hidden-answer", false),
  ],
};
