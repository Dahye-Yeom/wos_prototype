const tooltip = document.createElement("div");
tooltip.className = "ui-tooltip";
tooltip.setAttribute("role", "tooltip");
document.body.appendChild(tooltip);

document.querySelectorAll("[data-tooltip]").forEach((target) => {
  target.addEventListener("mouseenter", () => showTooltip(target));
  target.addEventListener("focus", () => showTooltip(target));
  target.addEventListener("mouseleave", hideTooltip);
  target.addEventListener("blur", hideTooltip);
});

const gnbToastMessages = {
  "접기": "GNB 메뉴를 접는 기능을 제공합니다.",
  "AI": "AI 화면으로 이동합니다.",
  "포탈": "포탈 화면으로 이동합니다.",
  "알림": "알림 목록을 확인할 수 있습니다.",
  "메신저": "메신저 화면으로 이동합니다.",
  "메일": "메일 화면으로 이동합니다.",
  "일정관리": "일정관리 화면으로 이동합니다.",
  "전자결재": "전자결재 화면으로 이동합니다.",
  "스마트워크": "스마트워크 화면으로 이동합니다.",
  "워크스페이스": "워크스페이스 화면입니다.",
  "근태관리": "근태관리 화면으로 이동합니다.",
  "문서관리": "문서관리 화면으로 이동합니다.",
  "자원예약": "자원예약 화면으로 이동합니다.",
  "드라이브": "드라이브 화면으로 이동합니다.",
  "설문관리": "설문관리 화면으로 이동합니다.",
  "전체 메뉴": "전체 메뉴를 확인할 수 있습니다.",
  "설정": "설정 화면으로 이동합니다.",
  "내 프로필": "내 프로필 화면으로 이동합니다.",
};

document.querySelectorAll(".pc-gnb button").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("aria-label") || button.dataset.tooltip;
    showToast(gnbToastMessages[name] || `${name} 기능을 제공합니다.`);
  });
});

const lnbRouteToastMessages = {
  "all-workspaces": "전체 워크스페이스 목록을 확인할 수 있습니다.",
  "my-workspaces": "내 워크스페이스 목록을 확인할 수 있습니다.",
  "assigned-tasks": "내가 담당한 작업을 모아볼 수 있습니다.",
  "bookmarks": "북마크한 항목을 모아볼 수 있습니다.",
  "shared-tasks": "공유받은 작업을 모아볼 수 있습니다.",
  "favorite-boards": "관심 보드를 모아볼 수 있습니다.",
  "drafts": "임시보관함 화면으로 이동합니다.",
};

document.querySelectorAll(".workspace-lnb [data-route]:not([data-screen-target])").forEach((button) => {
  button.addEventListener("click", () => {
    showToast(lnbRouteToastMessages[button.dataset.route] || `${button.textContent.trim()} 화면으로 이동합니다.`);
  });
});

const lnbToolToastMessages = {
  "휴지통": "삭제된 항목을 확인할 수 있습니다.",
  "사용자 설정": "사용자 설정을 변경할 수 있습니다.",
  "모듈 설정": "모듈 설정 화면으로 이동합니다. 이 버튼은 모듈 관리자에게만 보입니다.",
};

document.querySelectorAll(".lnb-tools button").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("aria-label") || button.dataset.tooltip;
    showToast(lnbToolToastMessages[name] || `${name} 기능을 제공합니다.`);
  });
});

document.querySelectorAll("[data-home-toast]").forEach((button) => {
  button.addEventListener("click", () => {
    showToast(button.dataset.homeToast);
  });
});

document.querySelectorAll(".lnb-section-head").forEach((button) => {
  button.addEventListener("click", () => {
    const section = button.closest(".lnb-section");
    const isOpen = section.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

document.querySelectorAll(".lnb-home, .lnb-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".lnb-home, .lnb-item").forEach((item) => {
      item.classList.remove("is-selected");
    });
    button.classList.add("is-selected");
  });
});

document.querySelectorAll("[data-screen-target]").forEach((button) => {
  button.addEventListener("click", () => {
    showLnbPanel(button.dataset.lnbTarget);
    showScreen(button.dataset.screenTarget);
    if (button.dataset.screenTarget === "boardDashboardScreen" && button.dataset.boardDefaultView) {
      setBoardView(button.dataset.boardDefaultView);
    }
  });
  button.addEventListener("keydown", (event) => {
    if (button.tagName === "BUTTON") return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      button.click();
    }
  });
});

document.querySelectorAll("[data-lnb-target]:not([data-screen-target])").forEach((button) => {
  button.addEventListener("click", () => {
    showLnbPanel(button.dataset.lnbTarget);
    clearLnbSelection(button.dataset.lnbTarget);
  });
});

document.querySelectorAll("[data-overview-menu-toggle]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const menu = button.closest(".overview-breadcrumb")?.querySelector("[data-overview-menu]");
    if (!menu) return;

    const isOpen = menu.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

document.querySelectorAll("[data-overview-menu] button").forEach((button) => {
  button.addEventListener("click", () => {
    closeOverviewMenu();
  });
});

document.querySelectorAll("[data-popover-toggle]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const popover = document.getElementById(button.dataset.popoverToggle);
    if (!popover) return;

    const isOpen = !popover.classList.contains("is-open");
    closeBoardPopovers();
    popover.classList.toggle("is-open", isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

document.querySelectorAll(".board-popover button").forEach((button) => {
  button.addEventListener("click", () => {
    closeBoardPopovers();
  });
});

document.querySelectorAll("[data-task-popover-toggle]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const popover = document.getElementById(button.dataset.taskPopoverToggle);
    if (!popover) return;

    const isOpen = !popover.classList.contains("is-open");
    closeTaskPanelPopovers();
    popover.classList.toggle("is-open", isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

document.querySelectorAll(".task-panel-popover button").forEach((button) => {
  button.addEventListener("click", (event) => {
    if (button.matches("[data-task-view-option]")) {
      if (event.target.closest("img")) {
        showToast(button.dataset.taskEditToast);
      } else {
        const label = document.querySelector("[data-task-view-label]");
        if (label) label.textContent = button.dataset.taskViewOption;
        applyTaskDetailView(button.dataset.taskViewOption);
      }
    } else if (button.dataset.taskToast) {
      showToast(button.dataset.taskToast);
    }
    closeTaskPanelPopovers();
    return;

  });
});

const taskDetailViewFieldOrders = {
  "기본": ["registrar", "assignee", "start", "due", "stage", "priority", "modified", "created"],
  "필수 항목": ["assignee", "start", "due", "priority"],
  "전체 항목": ["assignee", "start", "due", "stage", "state", "priority", "modified", "registrar", "created"],
};

function applyTaskDetailView(viewName) {
  const grid = document.querySelector(".task-view-body .task-form-grid");
  if (!grid) return;

  const order = taskDetailViewFieldOrders[viewName] || taskDetailViewFieldOrders["기본"];
  const fields = new Map(
    Array.from(grid.querySelectorAll("[data-task-detail-field]")).map((field) => [field.dataset.taskDetailField, field]),
  );

  fields.forEach((field) => {
    field.hidden = true;
  });

  order.forEach((fieldName) => {
    const field = fields.get(fieldName);
    if (!field) return;
    field.hidden = false;
    grid.append(field);
  });
}

document.querySelectorAll("[data-task-date-toggle], [data-task-select-toggle]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const targetId = button.dataset.taskDateToggle || button.dataset.taskSelectToggle;
    const popover = document.getElementById(targetId);
    if (!popover) return;

    const isOpen = !popover.classList.contains("is-open");
    closeTaskFieldPopovers();
    popover.classList.toggle("is-open", isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

document.querySelectorAll("[data-task-date-value]").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest(".task-form-row");
    const label = row?.querySelector("[data-task-date-label]");
    if (label) {
      label.textContent = button.dataset.taskDateValue;
      label.closest(".task-value-pill")?.classList.remove("task-empty-pill");
    }

    button.closest(".task-calendar-grid")?.querySelectorAll("[data-task-date-value]").forEach((item) => {
      item.classList.toggle("is-selected", item === button);
    });
    closeTaskFieldPopovers();
  });
});

document.querySelectorAll("[data-task-select-option]").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest(".task-form-row");
    const trigger = row?.querySelector("[data-task-select-toggle]");
    const label = row?.querySelector("[data-task-select-label]");
    if (label) {
      label.textContent = button.dataset.taskSelectOption;
      label.closest(".task-value-pill")?.classList.remove("task-empty-pill");
    }

    if (trigger?.matches("[data-task-priority-button]")) {
      trigger.classList.remove("priority-very-low", "priority-low", "priority-normal", "priority-high", "priority-very-high");
      trigger.classList.add(button.dataset.taskPriorityClass);
    }
    if (trigger?.matches("[data-task-state-button]")) {
      trigger.classList.remove("state-wait", "state-progress", "state-done");
      trigger.classList.add(button.dataset.taskStateClass);
    }
    closeTaskFieldPopovers();
  });
});

document.querySelectorAll(".task-field-icon[data-task-toast]").forEach((button) => {
  button.addEventListener("click", () => {
    showToast(button.dataset.taskToast);
  });
});

document.querySelectorAll("[data-task-activity-toast]").forEach((button) => {
  button.addEventListener("click", () => {
    closeTaskPanelPopovers();
    showToast(button.dataset.taskToast);
    return;
  });
});

document.querySelectorAll("[data-task-section-toggle]").forEach((toggle) => {
  const toggleSection = () => {
    const section = toggle.closest(".task-info-section, .task-linked-section");
    if (!section) return;

    const isCollapsed = section.classList.toggle("is-collapsed");
    toggle.setAttribute("aria-expanded", String(!isCollapsed));
  };

  toggle.addEventListener("click", toggleSection);
  toggle.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleSection();
    }
  });
});

document.querySelectorAll("[data-task-note-add]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const section = button.closest(".task-note-section, .feed-note");
    if (!section) return;
    const feedCard = section.closest(".feed-card");
    if (feedCard && !feedCard.classList.contains("is-expanded")) return;

    const editor = getNoteEditor(section);
    const activeTab = section.querySelector("[data-task-note-tab].is-active");
    if (activeTab && editor) activeTab.dataset.noteText = getNoteContent(editor);

    const tab = document.createElement("button");
    tab.type = "button";
    tab.dataset.taskNoteTab = "";
    tab.dataset.noteText = "";
    setTaskNoteTabLabel(tab, getNextTaskNoteLabel(section));
    button.before(tab);
    bindTaskNoteTab(tab, section, editor);
    tab.click();
  });
});

document.querySelectorAll("[data-task-panel-title]").forEach(bindTaskPanelTitle);

const taskNoteTextByTab = {
  "정리 목적": "사용자가 모바일 환경에서 게시판 글을 작성하고 검토 요청을 보내는 흐름을 정리합니다. 첨부 파일, 임시 저장, 알림 수신 상태까지 확인할 수 있도록 주요 예외 케이스를 함께 점검합니다.",
  "현황 조사": "현재 모바일 게시판 작성 화면에서는 제목, 본문, 첨부 파일 영역이 한 화면 안에서 이어지지만 검토 요청으로 넘어가는 진입점이 명확하지 않습니다. 일부 사용자는 임시 저장 후 다시 작성 화면으로 돌아오는 흐름을 반복하고 있으며, 첨부 파일 업로드 상태와 알림 수신 여부를 확인하는 단계도 분리되어 있습니다.\n\n현황 조사에서는 최근 작성된 게시글, 검토 요청이 반려된 사례, 모바일에서 첨부 파일을 추가한 작업을 중심으로 흐름을 확인합니다. 특히 결재/게시판/알림 모듈 간 이동 시 사용자가 현재 작업 상태를 놓치지 않도록 필요한 안내 문구와 버튼 배치를 함께 검토합니다.",
  "노트": "",
  "노트02": "추가 노트에는 담당자 검토 의견, 회의 중 결정된 보완 사항, 다음 단계에서 확인할 항목을 정리합니다.",
};

document.querySelectorAll(".task-note-section, .feed-note").forEach((section) => {
  const editor = getNoteEditor(section);
  if (!editor) return;

  section.querySelectorAll("[data-task-note-tab]").forEach((tab) => {
    const label = getTaskNoteTabLabel(tab);
    setTaskNoteTabLabel(tab, label);
    tab.dataset.noteText = tab.classList.contains("is-active")
      ? getNoteContent(editor)
      : taskNoteTextByTab[label] || "";
    bindTaskNoteTab(tab, section, editor);
  });
});

document.querySelectorAll("textarea[data-task-note-content], textarea[data-task-note-editor], .task-create-note").forEach((textarea) => {
  textarea.addEventListener("input", () => resizeTextareaToContent(textarea));
  resizeTextareaToContent(textarea);
});

function bindTaskNoteTab(tab, section, editor) {
  tab.addEventListener("click", (event) => {
    event.stopPropagation();
    const currentEditor = getNoteEditor(section) || editor;
    if (event.target.closest("[data-task-note-menu-toggle]")) {
      event.stopPropagation();
      toggleTaskNoteMenu(tab);
      return;
    }

    closeTaskNoteMenu();
    const activeTab = section.querySelector("[data-task-note-tab].is-active");
    if (activeTab && currentEditor) activeTab.dataset.noteText = getNoteContent(currentEditor);

    section.querySelectorAll("[data-task-note-tab]").forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    const label = getTaskNoteTabLabel(tab);
    const nextText = Object.prototype.hasOwnProperty.call(tab.dataset, "noteText")
      ? tab.dataset.noteText
      : taskNoteTextByTab[label] || "";
    if (currentEditor) setNoteContent(currentEditor, nextText);
  });
}

function getNoteEditor(section) {
  return section.querySelector("[data-task-note-content], [data-task-note-text]");
}

function getNoteContent(editor) {
  return editor.matches("textarea") ? editor.value : editor.textContent.trim();
}

function setNoteContent(editor, text) {
  if (editor.matches("textarea")) {
    editor.value = text;
    resizeTextareaToContent(editor);
  } else {
    editor.textContent = text || "내용을 입력하세요.";
  }
}

function setTaskNoteTabLabel(tab, label) {
  tab.innerHTML = "";

  const labelNode = document.createElement("span");
  labelNode.className = "task-note-tab-label";
  labelNode.textContent = label;

  const menuIcon = document.createElement("img");
  menuIcon.className = "task-note-tab-menu-icon";
  menuIcon.src = "./resources/Ico-System/app=kebab, style=line.svg";
  menuIcon.alt = "";
  menuIcon.dataset.taskNoteMenuToggle = "";

  tab.append(labelNode, menuIcon);
}

function getTaskNoteTabLabel(tab) {
  return tab.querySelector(".task-note-tab-label")?.textContent.trim() || tab.textContent.trim();
}

function getNextTaskNoteLabel(section) {
  const tabs = Array.from(section.querySelectorAll("[data-task-note-tab]"));
  const maxNumber = tabs
    .map((tab) => getTaskNoteTabLabel(tab).match(/^노트(\d+)$/)?.[1])
    .filter(Boolean)
    .map(Number)
    .reduce((max, value) => Math.max(max, value), tabs.length);
  return `노트${String(maxNumber + 1).padStart(2, "0")}`;
}

function toggleTaskNoteMenu(tab) {
  let menu = document.querySelector("[data-task-note-menu]");
  const isSameTab = menu?.dataset.forTab === getTaskNoteTabLabel(tab) && !menu.hidden;

  closeTaskNoteMenu();
  if (isSameTab) return;

  if (!menu) {
    menu = document.createElement("div");
    menu.className = "task-note-tab-popover";
    menu.dataset.taskNoteMenu = "";
    menu.innerHTML = `
      <button type="button" data-task-note-menu-action="rename">제목 변경</button>
      <button type="button" data-task-note-menu-action="move-left">왼쪽 이동</button>
      <button type="button" data-task-note-menu-action="move-right">오른쪽 이동</button>
      <button type="button" data-task-note-menu-action="delete">노트 삭제</button>
    `;
    document.body.append(menu);
  }

  const isFeedNote = Boolean(tab.closest(".feed-note"));
  const renameButton = menu.querySelector('[data-task-note-menu-action="rename"]');
  if (renameButton) renameButton.hidden = isFeedNote;

  menu.hidden = false;
  menu.dataset.forTab = getTaskNoteTabLabel(tab);
  menu.currentTab = tab;
  const rect = tab.getBoundingClientRect();
  menu.style.left = `${rect.left}px`;
  menu.style.top = `${rect.bottom + 6}px`;
}

function closeTaskNoteMenu() {
  const menu = document.querySelector("[data-task-note-menu]");
  if (!menu) return;
  menu.hidden = true;
  if (menu.currentTab) delete menu.currentTab;
}

document.addEventListener("click", (event) => {
  const menu = document.querySelector("[data-task-note-menu]");
  if (!menu || menu.hidden) return;
  if (event.target.closest("[data-task-note-menu], [data-task-note-menu-toggle]")) return;
  closeTaskNoteMenu();
});

document.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-task-note-menu-action]");
  if (!actionButton) return;

  const menu = actionButton.closest("[data-task-note-menu]");
  const tab = menu?.currentTab;
  if (!tab) return;

  const action = actionButton.dataset.taskNoteMenuAction;
  if (action === "rename") {
    if (tab.closest(".feed-note")) return;
    startTaskNoteTabRename(tab);
  } else if (action === "move-left") {
    moveTaskNoteTab(tab, -1);
  } else if (action === "move-right") {
    moveTaskNoteTab(tab, 1);
  } else if (action === "delete") {
    deleteTaskNoteTab(tab);
  }

  closeTaskNoteMenu();
});

function startTaskNoteTabRename(tab) {
  const label = tab.querySelector(".task-note-tab-label");
  if (!label) return;

  label.contentEditable = "true";
  label.focus();
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(label);
  selection.removeAllRanges();
  selection.addRange(range);

  const finish = () => {
    label.contentEditable = "false";
    label.textContent = label.textContent.trim() || "노트";
    label.removeEventListener("blur", finish);
  };

  label.addEventListener("blur", finish);
  label.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      label.blur();
    }
  }, { once: true });
}

function moveTaskNoteTab(tab, direction) {
  const tabs = Array.from(tab.closest(".task-note-tabs, .feed-note-tabs").querySelectorAll("[data-task-note-tab]"));
  const currentIndex = tabs.indexOf(tab);
  const target = tabs[currentIndex + direction];
  if (!target) return;

  if (direction < 0) {
    target.before(tab);
  } else {
    target.after(tab);
  }
}

function deleteTaskNoteTab(tab) {
  const section = tab.closest(".task-note-section, .feed-note");
  const editor = section ? getNoteEditor(section) : null;
  const tabs = Array.from(section?.querySelectorAll("[data-task-note-tab]") || []);
  if (tabs.length <= 1) {
    showToast("노트는 최소 1개 이상 필요합니다.");
    return;
  }

  const isActive = tab.classList.contains("is-active");
  const currentIndex = tabs.indexOf(tab);
  const fallbackTab = tabs[currentIndex + 1] || tabs[currentIndex - 1];
  tab.remove();

  if (isActive && fallbackTab && editor) {
    fallbackTab.classList.add("is-active");
    fallbackTab.setAttribute("aria-selected", "true");
    setNoteContent(editor, fallbackTab.dataset.noteText || taskNoteTextByTab[getTaskNoteTabLabel(fallbackTab)] || "");
  }
}

function bindTaskPanelTitle(title) {
  const startEdit = () => {
    const value = title.textContent.trim();
    const input = document.createElement("input");
    input.type = "text";
    input.className = "task-panel-title-input";
    input.value = value;
    input.setAttribute("aria-label", "작업 제목");
    title.replaceWith(input);
    input.focus();
    input.select();

    let isCancelled = false;
    const save = () => {
      if (isCancelled) return;
      const nextTitle = document.createElement("h2");
      nextTitle.dataset.taskPanelTitle = "";
      nextTitle.tabIndex = 0;
      nextTitle.textContent = input.value.trim() || value;
      input.replaceWith(nextTitle);
      bindTaskPanelTitle(nextTitle);
    };

    const cancel = () => {
      isCancelled = true;
      const nextTitle = document.createElement("h2");
      nextTitle.dataset.taskPanelTitle = "";
      nextTitle.tabIndex = 0;
      nextTitle.textContent = value;
      input.replaceWith(nextTitle);
      bindTaskPanelTitle(nextTitle);
    };

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") input.blur();
      if (event.key === "Escape") {
        event.preventDefault();
        cancel();
      }
    });
    input.addEventListener("blur", save, { once: true });
  };

  title.addEventListener("click", startEdit);
  title.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    startEdit();
  });
}

document.querySelectorAll("[data-task-action-toast]").forEach((target) => {
  target.addEventListener("click", (event) => {
    event.stopPropagation();
    showToast(target.dataset.taskActionToast);
  });
});

document.querySelectorAll("[data-feed-expanded-toast]").forEach((target) => {
  target.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!target.closest(".feed-card")?.classList.contains("is-expanded")) return;
    showToast(target.dataset.feedExpandedToast);
  });
});

document.querySelectorAll("[data-kanban-subtask-toggle]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const card = button.closest(".kanban-card");
    const popover = card?.querySelector("[data-kanban-subtask-popover]");
    if (!popover) return;

    document.querySelectorAll("[data-kanban-subtask-popover]").forEach((item) => {
      if (item !== popover) item.hidden = true;
    });
    document.querySelectorAll("[data-kanban-subtask-toggle][aria-expanded='true']").forEach((item) => {
      if (item !== button) item.setAttribute("aria-expanded", "false");
    });

    const willOpen = popover.hidden;
    popover.hidden = !willOpen;
    button.setAttribute("aria-expanded", String(willOpen));
  });
});

document.querySelectorAll("[data-kanban-subtask-popover]").forEach((popover) => {
  popover.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

document.querySelectorAll("[data-kanban-column-toggle]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const column = button.closest(".kanban-column");
    if (!column) return;

    const title = column.querySelector(".kanban-column-title")?.textContent.trim() || "컬럼";
    const willCollapse = !column.classList.contains("is-collapsed");
    const icon = button.querySelector("img");

    column.classList.toggle("is-collapsed", willCollapse);
    button.setAttribute("aria-expanded", String(!willCollapse));
    button.setAttribute("aria-label", `${title} 컬럼 ${willCollapse ? "펼치기" : "축소"}`);
    if (icon) {
      icon.src = willCollapse
        ? "./resources/Ico-System/app=expand, style=line.svg"
        : "./resources/Ico-System/app=collapse, style=line.svg";
    }
  });
});

document.querySelectorAll(".kanban-card-top button[aria-label='더보기']").forEach(bindKanbanCardMenuButton);

function bindKanbanCardMenuButton(button) {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    showToast("작업 메뉴가 표시됩니다.");
  });
}

document.querySelectorAll(".kanban-card").forEach(bindKanbanCardDrag);
document.querySelectorAll(".kanban-card-list").forEach(bindKanbanDropZone);
document.querySelectorAll(".kanban-column").forEach(initKanbanQuickAdd);
document.querySelectorAll("[data-gantt-bar]").forEach(bindGanttBar);

function bindKanbanCardDrag(card) {
  card.draggable = true;

  card.addEventListener("dragstart", (event) => {
    card.classList.add("is-dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", card.querySelector("h4")?.textContent.trim() || "");
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("is-dragging");
    card.dataset.kanbanDragged = "true";
    document.querySelectorAll(".kanban-card-list.is-drop-target").forEach((list) => {
      list.classList.remove("is-drop-target");
    });
    updateKanbanColumnCounts();
    window.setTimeout(() => {
      delete card.dataset.kanbanDragged;
    }, 150);
  });
}

function bindKanbanDropZone(list) {
  list.addEventListener("dragover", (event) => {
    const dragging = document.querySelector(".kanban-card.is-dragging");
    if (!dragging) return;

    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    list.classList.add("is-drop-target");

    const nextCard = getKanbanDropTarget(list, event.clientY);
    if (nextCard) {
      list.insertBefore(dragging, nextCard);
    } else {
      list.insertBefore(dragging, list.querySelector(".kanban-quick-add"));
    }
    updateKanbanCardState(dragging, list.closest(".kanban-column"));
  });

  list.addEventListener("dragleave", (event) => {
    if (list.contains(event.relatedTarget)) return;
    list.classList.remove("is-drop-target");
  });

  list.addEventListener("drop", (event) => {
    event.preventDefault();
    list.classList.remove("is-drop-target");
    const dragging = document.querySelector(".kanban-card.is-dragging");
    if (dragging) updateKanbanCardState(dragging, list.closest(".kanban-column"));
    updateKanbanColumnCounts();
  });
}

function getKanbanDropTarget(list, pointerY) {
  const cards = Array.from(list.querySelectorAll(".kanban-card:not(.is-dragging)"));
  return cards.find((card) => {
    const rect = card.getBoundingClientRect();
    return pointerY < rect.top + rect.height / 2;
  });
}

function updateKanbanCardState(card, column) {
  const stage = card.querySelector(".kanban-card-top b");
  if (!stage || !column) return;

  stage.classList.remove("stage-waiting", "stage-progress", "stage-finished");
  if (column.classList.contains("progress")) {
    stage.classList.add("stage-progress");
    stage.textContent = "진행";
  } else if (column.classList.contains("finished")) {
    stage.classList.add("stage-finished");
    stage.textContent = "완료";
  } else {
    stage.classList.add("stage-waiting");
    stage.textContent = "대기";
  }
}

function updateKanbanColumnCounts() {
  document.querySelectorAll(".kanban-column").forEach((column) => {
    const badge = column.querySelector(".kanban-column-count");
    if (!badge) return;
    badge.textContent = String(column.querySelectorAll(".kanban-card").length);
  });
}

function initKanbanQuickAdd(column) {
  if (column.querySelector(".kanban-quick-add")) return;

  const list = column.querySelector(".kanban-card-list");
  if (!list) return;

  const quickAdd = document.createElement("div");
  quickAdd.className = "kanban-quick-add";
  quickAdd.innerHTML = `
    <button class="kanban-quick-add-button" type="button">작업 등록</button>
    <div class="kanban-quick-add-form">
      <input type="text" aria-label="새 작업 제목" placeholder="작업 제목 입력">
      <div class="kanban-quick-add-actions">
        <button class="kanban-quick-add-cancel" type="button">취소</button>
        <button class="kanban-quick-add-submit" type="button">등록</button>
      </div>
    </div>
  `;

  const openButton = quickAdd.querySelector(".kanban-quick-add-button");
  const input = quickAdd.querySelector("input");
  const cancelButton = quickAdd.querySelector(".kanban-quick-add-cancel");
  const submitButton = quickAdd.querySelector(".kanban-quick-add-submit");

  const openEditor = () => {
    quickAdd.classList.add("is-editing");
    window.requestAnimationFrame(() => input.focus());
  };
  const closeEditor = () => {
    quickAdd.classList.remove("is-editing");
    input.value = "";
  };
  const submitTask = () => {
    const title = input.value.trim();
    if (!title) {
      input.focus();
      return;
    }

    const card = createKanbanCard(title, column);
    list.insertBefore(card, quickAdd);
    bindKanbanCardDrag(card);
    bindTaskPanelTrigger(card);
    const menuButton = card.querySelector(".kanban-card-top button[aria-label='더보기']");
    if (menuButton) bindKanbanCardMenuButton(menuButton);
    updateKanbanColumnCounts();
    closeEditor();
  };

  openButton.addEventListener("click", openEditor);
  cancelButton.addEventListener("click", closeEditor);
  submitButton.addEventListener("click", submitTask);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitTask();
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeEditor();
      openButton.focus();
    }
  });

  list.append(quickAdd);
}

function createKanbanCard(title, column) {
  const card = document.createElement("article");
  card.className = "kanban-card priority-normal";
  card.tabIndex = 0;
  card.dataset.openTaskPanel = "";

  const stage = getKanbanColumnStage(column);
  const today = formatKanbanDate(new Date());
  card.innerHTML = `
    <div class="kanban-card-top">
      <span class="fake-checkbox"></span>
      <span>${getNextKanbanId()}</span>
      <b class="${stage.className}">${stage.label}</b>
      <em><i></i>보통</em>
      <button type="button" aria-label="더보기"><img src="./resources/Ico-System/app=kebab, style=line.svg" alt=""></button>
    </div>
    <h4></h4>
    <div class="kanban-card-assignee"><small>등록자</small><span><span class="table-avatar navy">김</span>김지은</span></div>
    <div class="kanban-card-date"><span>등록일</span><time>${today}</time></div>
  `;
  card.querySelector("h4").textContent = title;
  return card;
}

function getKanbanColumnStage(column) {
  if (column.classList.contains("progress")) {
    return { className: "stage-progress", label: "진행" };
  }
  if (column.classList.contains("finished")) {
    return { className: "stage-finished", label: "완료" };
  }
  return { className: "stage-waiting", label: "대기" };
}

function getNextKanbanId() {
  const maxId = Array.from(document.querySelectorAll(".kanban-card-top span"))
    .map((span) => span.textContent.trim().match(/^plan-(\d+)$/)?.[1])
    .filter(Boolean)
    .map(Number)
    .reduce((max, value) => Math.max(max, value), 1000);
  return `plan-${String(maxId + 1).padStart(4, "0")}`;
}

function formatKanbanDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function bindGanttBar(bar) {
  if (!bar.querySelector("[data-gantt-connect]")) {
    const connectHandle = document.createElement("button");
    connectHandle.className = "gantt-connect-handle";
    connectHandle.type = "button";
    connectHandle.setAttribute("aria-label", "작업 연결");
    connectHandle.dataset.ganttConnect = "";
    bar.append(connectHandle);
  }

  bar.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();

    const isConnectDrag = Boolean(event.target.closest("[data-gantt-connect]"));
    const mode = isConnectDrag
      ? "connect"
      : event.target.closest("[data-gantt-resize]")?.dataset.ganttResize || "move";
    const board = bar.closest(".gantt-bars");
    const maxDays = Number(board?.style.getPropertyValue("--days")) || 32;
    const cellWidth = 32;
    const initialX = event.clientX;
    const initialStart = getGanttNumber(bar, "--start", 0);
    const initialDuration = getGanttNumber(bar, "--duration", 1);

    bar.classList.add("is-dragging");
    if (mode === "connect") {
      bar.classList.add("is-connecting");
      ensureGanttDependencyLayer(board);
    }
    bar.setPointerCapture?.(event.pointerId);

    const updateBar = (moveEvent) => {
      const delta = Math.round((moveEvent.clientX - initialX) / cellWidth);
      let nextStart = initialStart;
      let nextDuration = initialDuration;

      if (mode === "connect") {
        updateGanttDependencyPreview(board, bar, moveEvent);
        return;
      }

      if (mode === "start") {
        nextStart = clamp(initialStart + delta, 0, initialStart + initialDuration - 1);
        nextDuration = initialDuration + initialStart - nextStart;
      } else if (mode === "end") {
        nextDuration = clamp(initialDuration + delta, 1, maxDays - initialStart);
      } else {
        nextStart = clamp(initialStart + delta, 0, maxDays - initialDuration);
      }

      bar.style.setProperty("--start", String(nextStart));
      bar.style.setProperty("--duration", String(nextDuration));
    };

    const stopDrag = (upEvent) => {
      bar.classList.remove("is-dragging");
      bar.classList.remove("is-connecting");
      let shouldRenderDependencies = false;
      if (mode === "connect") {
        shouldRenderDependencies = createGanttDependencyFromPointer(board, bar, upEvent);
        clearGanttDependencyPreview(board);
      }
      bar.releasePointerCapture?.(upEvent.pointerId);
      document.removeEventListener("pointermove", updateBar);
      document.removeEventListener("pointerup", stopDrag);
      if (shouldRenderDependencies || board?.dataset.ganttDependencies) {
        renderGanttDependencies(board);
      } else {
        clearGanttConnectTargets(board);
      }
    };

    document.addEventListener("pointermove", updateBar);
    document.addEventListener("pointerup", stopDrag);
  });
}

function ensureGanttDependencyLayer(board) {
  if (!board) return null;

  let svg = board.querySelector(".gantt-dependency-layer");
  if (svg) return svg;

  svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("gantt-dependency-layer");
  svg.setAttribute("aria-hidden", "true");
  svg.innerHTML = `
    <defs>
      <marker id="ganttDependencyArrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,0 L8,4 L0,8 Z" fill="currentColor"></path>
      </marker>
    </defs>
  `;
  board.prepend(svg);
  return svg;
}

function updateGanttDependencyPreview(board, sourceBar, event) {
  const svg = ensureGanttDependencyLayer(board);
  if (!svg) return;

  const sourcePoint = getGanttAnchorPoint(board, sourceBar, "end");
  const boardRect = board.getBoundingClientRect();
  const targetPoint = {
    x: event.clientX - boardRect.left,
    y: event.clientY - boardRect.top,
  };

  let preview = svg.querySelector(".gantt-dependency-preview");
  if (!preview) {
    preview = document.createElementNS("http://www.w3.org/2000/svg", "path");
    preview.classList.add("gantt-dependency-preview");
    svg.append(preview);
  }
  preview.setAttribute("d", createGanttDependencyPath(sourcePoint, targetPoint));

  const targetBar = getGanttConnectionTarget(event, sourceBar);
  clearGanttConnectTargets(board);
  targetBar?.classList.add("is-connect-target");
}

function createGanttDependencyFromPointer(board, sourceBar, event) {
  const targetBar = getGanttConnectionTarget(event, sourceBar);
  if (!board || !targetBar) return false;

  const dependencies = JSON.parse(board.dataset.ganttDependencies || "[]");
  const sourceIndex = getGanttBarIndex(board, sourceBar);
  const targetIndex = getGanttBarIndex(board, targetBar);
  const exists = dependencies.some((item) => item.source === sourceIndex && item.target === targetIndex);
  if (!exists) {
    dependencies.push({ source: sourceIndex, target: targetIndex });
    board.dataset.ganttDependencies = JSON.stringify(dependencies);
  }
  renderGanttDependencies(board);
  return true;
}

function renderGanttDependencies(board) {
  const svg = ensureGanttDependencyLayer(board);
  if (!board || !svg) return;

  svg.querySelectorAll(".gantt-dependency-path").forEach((path) => path.remove());
  clearGanttConnectTargets(board);

  const bars = [...board.querySelectorAll("[data-gantt-bar]")];
  const dependencies = JSON.parse(board.dataset.ganttDependencies || "[]");
  dependencies.forEach(({ source, target }) => {
    const sourceBar = bars[source];
    const targetBar = bars[target];
    if (!sourceBar || !targetBar || !isGanttBarVisible(sourceBar) || !isGanttBarVisible(targetBar)) return;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.classList.add("gantt-dependency-path");
    path.setAttribute("d", createGanttDependencyPath(
      getGanttAnchorPoint(board, sourceBar, "end"),
      getGanttAnchorPoint(board, targetBar, "start"),
    ));
    svg.append(path);
  });
}

function isGanttBarVisible(bar) {
  return !bar.closest(".gantt-chart-row")?.classList.contains("is-tree-collapsed");
}

function clearGanttDependencyPreview(board) {
  board?.querySelector(".gantt-dependency-preview")?.remove();
}

function clearGanttConnectTargets(board) {
  board?.querySelectorAll(".gantt-bar.is-connect-target").forEach((bar) => {
    bar.classList.remove("is-connect-target");
  });
}

function getGanttConnectionTarget(event, sourceBar) {
  const board = sourceBar.closest(".gantt-bars");
  const pointerTolerance = 10;
  const candidates = [...board.querySelectorAll("[data-gantt-bar]")]
    .filter((bar) => bar !== sourceBar && isGanttBarVisible(bar));
  return candidates.find((bar) => {
    const handle = bar.querySelector("[data-gantt-resize='start']");
    const rect = handle?.getBoundingClientRect();
    if (!rect) return false;

    return event.clientX >= rect.left - pointerTolerance
      && event.clientX <= rect.right + pointerTolerance
      && event.clientY >= rect.top - pointerTolerance
      && event.clientY <= rect.bottom + pointerTolerance;
  }) || null;
}

function getGanttBarIndex(board, bar) {
  return [...board.querySelectorAll("[data-gantt-bar]")].indexOf(bar);
}

function getGanttAnchorPoint(board, bar, side) {
  const boardRect = board.getBoundingClientRect();
  const barRect = bar.getBoundingClientRect();
  return {
    x: (side === "start" ? barRect.left : barRect.right) - boardRect.left,
    y: barRect.top + barRect.height / 2 - boardRect.top,
  };
}

function createGanttDependencyPath(from, to) {
  const elbowGap = 18;
  const midX = Math.max(from.x + elbowGap, (from.x + to.x) / 2);
  return `M ${from.x} ${from.y} L ${midX} ${from.y} L ${midX} ${to.y} L ${to.x} ${to.y}`;
}

function getGanttNumber(element, propertyName, fallback) {
  const value = Number(element.style.getPropertyValue(propertyName));
  return Number.isNaN(value) ? fallback : value;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

document.querySelectorAll("[data-toolbar-view-toggle]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const wrap = button.closest(".toolbar-view-wrap");
    const popover = wrap?.querySelector("[data-toolbar-view-popover]");
    if (!popover) return;

    document.querySelectorAll("[data-toolbar-view-popover]").forEach((item) => {
      if (item !== popover) item.hidden = true;
    });
    document.querySelectorAll("[data-toolbar-view-toggle][aria-expanded='true']").forEach((item) => {
      if (item !== button) item.setAttribute("aria-expanded", "false");
    });

    const willOpen = popover.hidden;
    popover.hidden = !willOpen;
    button.setAttribute("aria-expanded", String(willOpen));
  });
});

document.querySelectorAll("[data-toolbar-view-toast]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    showToast(button.dataset.toolbarViewToast);
  });
});

document.querySelectorAll("[data-toolbar-view-option]").forEach((option) => {
  option.addEventListener("click", (event) => {
    event.stopPropagation();
    const wrap = option.closest(".toolbar-view-wrap");

    if (event.target.closest("[data-toolbar-view-edit]")) {
      showToast("화면 설정을 수정할 수 있습니다.");
      return;
    }

    const label = wrap?.querySelector("[data-toolbar-view-label]");
    if (label) label.textContent = option.dataset.toolbarViewOption;
    wrap?.querySelector("[data-toolbar-view-popover]")?.setAttribute("hidden", "");
    wrap?.querySelector("[data-toolbar-view-toggle]")?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-open-filter-canvas]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const offcanvas = document.getElementById("boardFilterOffcanvas");
    if (!offcanvas) return;

    closeBasicFilterPopovers();
    offcanvas.classList.add("is-open");
    offcanvas.setAttribute("aria-hidden", "false");
    button.setAttribute("aria-expanded", "true");
    offcanvas.querySelector("[data-close-filter-canvas]")?.focus();
  });
});

document.querySelectorAll("[data-close-filter-canvas]").forEach((button) => {
  button.addEventListener("click", () => closeFilterOffcanvas());
});

document.querySelectorAll("[data-basic-filter-toggle]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const wrap = button.closest(".toolbar-filter-wrap");
    const popover = wrap?.querySelector("[data-basic-filter-popover]");
    if (!popover) return;

    document.querySelectorAll("[data-basic-filter-popover]").forEach((item) => {
      if (item !== popover) item.hidden = true;
    });
    document.querySelectorAll("[data-basic-filter-toggle][aria-expanded='true']").forEach((item) => {
      if (item !== button) item.setAttribute("aria-expanded", "false");
    });

    const willOpen = popover.hidden;
    popover.hidden = !willOpen;
    button.setAttribute("aria-expanded", String(willOpen));
  });
});

document.querySelectorAll("[data-basic-filter-option]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const checked = button.getAttribute("aria-checked") === "true";
    button.setAttribute("aria-checked", String(!checked));
  });
});

document.querySelectorAll(".filter-field label").forEach((label) => {
  label.addEventListener("click", () => {
    label.classList.toggle("is-checked");
  });
});

document.getElementById("boardFilterOffcanvas")?.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) closeFilterOffcanvas();
});

const dashboardTypeData = {
  "기본 대시보드": {
    label: "기본 대시보드",
    summaryItems: [
      "총 <strong>102</strong>건의 작업이 있어요.",
      "<strong>15</strong>건의 수정 작업이 있어요.",
      "<strong>15</strong>건의 추가 작업이 있어요.",
      "<strong>15</strong>건의 완료 작업이 있어요.",
    ],
    status: { total: 102, wait: 22, progress: 50, done: 30 },
    assignees: [
      ["김", "김나온", 28],
      ["나", "나문구", 21],
      ["이", "이영희", 19],
      ["이", "이철수", 18],
      ["홍", "홍길동", 16],
    ],
    startValues: [8, 12, 18, 14, 22, 16, 12],
    delayedCount: 3,
    delayedItems: [
      ["김철수", "김", "blue", "웹 애플리케이션 성능 개선 요청", "normal", "보통", "마감 1일 지남"],
      ["홍길동", "홍", "", "모바일 전자결재 개선 요구사항 정리", "high", "높음", "마감 2일 지남"],
      ["이영희", "이", "pink", "데이터 시각화 기능 추가 요청", "normal", "보통", "마감 3일 지남"],
    ],
    recentItems: [
      ["홍길동", "홍", "", "모바일 전자결재 개선 요구사항 정리", "high", "높음", "항목명", "2분 전", true],
      ["김철수", "김", "blue", "웹 애플리케이션 성능 개선 요청", "normal", "보통", "완료일", "1시간 전"],
      ["이영희", "이", "pink", "데이터 시각화 기능 추가 요청", "normal", "보통", "담당자", "2시간 전"],
      ["이영희", "이", "pink", "데이터 시각화 기능 추가 요청", "normal", "보통", "하위 작업", "2시간 전", false, "추가했습니다."],
      ["김나온", "김", "blue", "사용자 권한 관리 정책 정리", "high", "높음", "담당자", "3시간 전"],
      ["홍길동", "홍", "", "메신저 알림 정책 개선안", "normal", "보통", "우선순위", "오늘 오전 10:20"],
      ["이철수", "이", "pink", "공통 컴포넌트 사용성 검토", "normal", "보통", "진행 상태", "오늘 오전 9:45"],
      ["나문구", "나", "blue", "워크스페이스 초대 플로우 정리", "high", "높음", "설명", "어제 오후 5:10"],
      ["홍길동", "홍", "", "대시보드 필터 동작 정의", "normal", "보통", "완료일", "어제 오후 3:30"],
      ["이영희", "이", "pink", "데이터 연동 예외 처리 개선", "normal", "보통", "첨부 파일", "어제 오전 11:00", false, "삭제했습니다."],
    ],
  },
  "완료 제외": {
    label: "완료 제외",
    summaryItems: [
      "완료 작업을 제외한 <strong>72</strong>건의 작업이 있어요.",
      "진행 중인 작업이 <strong>50</strong>건이에요.",
      "대기 중인 작업이 <strong>22</strong>건이에요.",
      "이번 주 마감 예정 작업이 <strong>18</strong>건이에요.",
    ],
    status: { total: 72, wait: 22, progress: 50, done: 0 },
    assignees: [
      ["김", "김나온", 23],
      ["나", "나문구", 17],
      ["이", "이영희", 13],
      ["이", "이철수", 10],
      ["홍", "홍길동", 9],
    ],
    startValues: [6, 9, 14, 12, 17, 8, 6],
    delayedCount: 5,
    delayedItems: [
      ["김나온", "김", "blue", "사용자 권한 관리 정책 정리", "high", "높음", "마감 오늘"],
      ["나문구", "나", "blue", "워크스페이스 초대 플로우 정리", "high", "높음", "마감 1일 지남"],
      ["홍길동", "홍", "", "모바일 전자결재 개선 요구사항 정리", "high", "높음", "마감 2일 지남"],
      ["이영희", "이", "pink", "데이터 시각화 기능 추가 요청", "normal", "보통", "마감 3일 지남"],
      ["이철수", "이", "pink", "공통 컴포넌트 사용성 검토", "normal", "보통", "마감 3일 지남"],
    ],
    recentItems: [
      ["김나온", "김", "blue", "사용자 권한 관리 정책 정리", "high", "높음", "담당자", "방금 전"],
      ["나문구", "나", "blue", "워크스페이스 초대 플로우 정리", "high", "높음", "완료일", "18분 전"],
      ["홍길동", "홍", "", "모바일 전자결재 개선 요구사항 정리", "high", "높음", "우선순위", "42분 전"],
      ["이영희", "이", "pink", "데이터 시각화 기능 추가 요청", "normal", "보통", "진행 상태", "1시간 전"],
      ["이철수", "이", "pink", "공통 컴포넌트 사용성 검토", "normal", "보통", "작업 노트", "2시간 전"],
    ],
  },
};

let dashboardSummaryItems = dashboardTypeData["기본 대시보드"].summaryItems;
let dashboardSummaryIndex = 0;

document.querySelectorAll("[data-dashboard-type]").forEach((button) => {
  button.addEventListener("click", () => {
    applyDashboardType(button.dataset.dashboardType);
  });
});

function applyDashboardType(type) {
  const data = dashboardTypeData[type] || { ...dashboardTypeData["기본 대시보드"], label: type };
  const label = document.querySelector("[data-dashboard-type-label]");
  if (label) label.textContent = data.label;

  document.querySelectorAll("[data-dashboard-type]").forEach((item) => {
    item.classList.toggle("is-selected", item.dataset.dashboardType === type);
  });

  dashboardSummaryItems = data.summaryItems;
  dashboardSummaryIndex = 0;
  const summary = document.querySelector("[data-dashboard-summary-text]");
  if (summary) summary.innerHTML = dashboardSummaryItems[0];

  updateDashboardStatus(data.status);
  updateDashboardAssignees(data.assignees);
  updateDashboardStartChart(data.startValues);
  updateDashboardActivity(data);
}

function updateDashboardStatus(status) {
  const donut = document.querySelector(".dashboard-donut");
  if (!donut) return;

  const waitEnd = (status.wait / status.total) * 100;
  const progressEnd = ((status.wait + status.progress) / status.total) * 100;
  donut.style.background = `conic-gradient(#d7d7d7 0 ${waitEnd}%, var(--accent) ${waitEnd}% ${progressEnd}%, #eeeeee ${progressEnd}% 100%)`;
  donut.setAttribute(
    "aria-label",
    `전체 작업 ${status.total}건, 대기 ${status.wait}건, 진행 ${status.progress}건, 완료 ${status.done}건`,
  );

  const total = donut.querySelector(".donut-center strong");
  if (total) total.textContent = status.total;

  const hoverLabels = donut.querySelectorAll(".donut-hover-labels span");
  if (hoverLabels[0]) hoverLabels[0].textContent = `대기 ${status.wait}건`;
  if (hoverLabels[1]) hoverLabels[1].textContent = `진행 ${status.progress}건`;
  if (hoverLabels[2]) hoverLabels[2].textContent = `완료 ${status.done}건`;

  const legendValues = document.querySelectorAll(".chart-legend strong");
  if (legendValues[0]) legendValues[0].textContent = status.wait;
  if (legendValues[1]) legendValues[1].textContent = status.progress;
  if (legendValues[2]) legendValues[2].textContent = status.done;
}

function updateDashboardAssignees(assignees) {
  const list = document.querySelector(".assignee-chart-card .bar-list");
  if (!list) return;

  const max = Math.max(...assignees.map((item) => item[2]));
  list.innerHTML = assignees.map(([initial, name, count]) => `
    <div>
      <span><i class="assignee-avatar" aria-hidden="true">${initial}</i>${name}</span>
      <b style="--bar:${(count / max) * 100}%"></b>
      <em>${count}건</em>
    </div>
  `).join("");
}

function updateDashboardStartChart(values) {
  const labels = ["07-06", "07-07", "07-08", "07-09", "07-10", "07-11", "07-12"];
  const valueNodes = document.querySelectorAll(".start-chart-values li strong");
  valueNodes.forEach((node, index) => {
    node.textContent = values[index];
  });

  const chart = document.querySelector(".start-chart");
  chart?.setAttribute(
    "aria-label",
    `시작일 별 작업 수. ${labels.map((label, index) => `${label} ${values[index]}건`).join(", ")}`,
  );
}

function updateDashboardActivity(data) {
  const delayedTabCount = document.querySelector("[data-activity-tab='delayed'] strong");
  if (delayedTabCount) delayedTabCount.textContent = data.delayedCount;

  const delayedPanel = document.querySelector("[data-activity-panel='delayed'] .activity-timeline");
  if (delayedPanel) {
    delayedPanel.innerHTML = data.delayedItems.map(([name, initial, color, title, priorityClass, priorityLabel, time]) => `
      <button type="button" data-route-target="작업 상세">
        <span class="activity-node"></span>
        <span class="avatar-dot ${color}">${initial}</span>
        <p><strong>${name}</strong> 님의 <b>${title} <em class="priority-chip ${priorityClass}">${priorityLabel}</em></b> 작업이 지연되었습니다.</p>
        <small>${time}</small>
      </button>
    `).join("");
  }

  const recentPanel = document.querySelector("[data-activity-panel='recent'] .activity-timeline");
  if (recentPanel) {
    recentPanel.innerHTML = data.recentItems.map(([
      name,
      initial,
      color,
      title,
      priorityClass,
      priorityLabel,
      field,
      time,
      hasPhoto = false,
      action = "수정했습니다.",
    ]) => `
      <button type="button" data-route-target="작업 상세">
        <span class="activity-node"></span>
        <span class="avatar-dot ${hasPhoto ? "has-photo" : color}">
          ${hasPhoto ? '<img src="./resources/Gnb/shutterstock_2588094639 1.png" alt="">' : initial}
        </span>
        <p><strong>${name}</strong> 님이 <b>${title} <em class="priority-chip ${priorityClass}">${priorityLabel}</em></b>에서 <mark>${field}</mark>을 ${action}</p>
        <small>${time}</small>
      </button>
    `).join("");
  }
}

document.querySelectorAll("[data-period-label]").forEach((button) => {
  button.addEventListener("click", () => {
    const label = document.querySelector("[data-dashboard-period-label]");
    if (label) label.textContent = button.dataset.periodLabel;

    document.querySelectorAll("[data-period-label]").forEach((item) => {
      item.classList.toggle("is-selected", item === button);
    });
  });
});

document.querySelectorAll("[data-summary-step]").forEach((button) => {
  button.addEventListener("click", () => {
    const step = Number(button.dataset.summaryStep);
    dashboardSummaryIndex =
      (dashboardSummaryIndex + step + dashboardSummaryItems.length) % dashboardSummaryItems.length;

    const summary = document.querySelector("[data-dashboard-summary-text]");
    if (summary) summary.innerHTML = dashboardSummaryItems[dashboardSummaryIndex];
  });
});

document.querySelectorAll("[data-tab-drag]").forEach((tab) => {
  const icon = tab.querySelector("img");

  tab.addEventListener("mouseenter", () => {
    if (icon) icon.src = "./resources/Ico-System/app=handle, style=line.svg";
  });
  tab.addEventListener("mouseleave", () => {
    if (icon && !tab.classList.contains("is-dragging")) icon.src = icon.dataset.defaultIcon;
  });
  tab.addEventListener("dragstart", (event) => {
    tab.classList.add("is-dragging");
    event.dataTransfer.effectAllowed = "move";
  });
  tab.addEventListener("dragend", () => {
    tab.classList.remove("is-dragging");
    if (icon) icon.src = icon.dataset.defaultIcon;
    document.querySelectorAll("[data-tab-drag].is-drop-target").forEach((item) => {
      item.classList.remove("is-drop-target");
    });
  });
  tab.addEventListener("dragover", (event) => {
    event.preventDefault();
    const dragging = document.querySelector("[data-tab-drag].is-dragging");
    if (!dragging || dragging === tab) return;

    tab.classList.add("is-drop-target");
    const rect = tab.getBoundingClientRect();
    const shouldInsertAfter = event.clientX > rect.left + rect.width / 2;
    tab.parentElement.insertBefore(dragging, shouldInsertAfter ? tab.nextSibling : tab);
  });
  tab.addEventListener("dragleave", () => {
    tab.classList.remove("is-drop-target");
  });
});

document.querySelectorAll("[data-board-view]").forEach((tab) => {
  tab.addEventListener("click", () => {
    const view = tab.dataset.boardView;
    if (!view) return;
    const screen = tab.closest(".board-dashboard-screen");
    const taskPanel = screen?.querySelector(".task-detail-panel");
    const isTaskPanelOpen = Boolean(taskPanel && !taskPanel.hidden);
    const currentTaskTitle = taskPanel?.querySelector(".task-view-body h2")?.textContent.trim();

    setBoardView(view);

    if (isTaskPanelOpen) {
      screen?.classList.add("has-task-panel");
      screen?.querySelector(".table-view-shell")?.classList.toggle("has-task-panel", view === "table");
      syncSelectedTaskPanelSource(screen, currentTaskTitle);
    } else {
      const shell = screen?.querySelector(".table-view-shell");
      screen?.classList.remove("has-task-panel");
      shell?.classList.remove("has-task-panel");
      if (taskPanel) taskPanel.hidden = true;
    }
  });
});

function setBoardView(view) {
  document.querySelectorAll("[data-board-view]").forEach((item) => {
    const isActive = item.dataset.boardView === view;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-selected", String(isActive));
  });
  document.querySelectorAll("[data-board-panel]").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.boardPanel === view);
  });
}

document.querySelectorAll("[data-feed-expand]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const card = button.closest(".feed-card");
    const extra = card?.querySelector(".feed-extra");
    if (!card || !extra) return;

    const willExpand = extra.hidden;
    extra.hidden = !willExpand;
    card.classList.toggle("is-expanded", willExpand);
    button.firstChild.textContent = willExpand ? "접기 " : "상세보기 ";
  });
});

document.querySelectorAll("[data-feed-subtask-toggle]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const card = button.closest(".feed-card");
    const wrap = button.closest(".feed-subtask-wrap") || card?.querySelector(".feed-subtask-wrap");
    const popover = wrap?.querySelector("[data-feed-subtask-popover]");
    if (!popover) return;

    document.querySelectorAll("[data-feed-subtask-popover]").forEach((item) => {
      if (item !== popover) item.hidden = true;
    });
    document.querySelectorAll("[data-feed-subtask-toggle][aria-expanded='true']").forEach((item) => {
      if (item !== button) item.setAttribute("aria-expanded", "false");
    });

    const willOpen = popover.hidden;
    popover.hidden = !willOpen;
    button.setAttribute("aria-expanded", String(willOpen));
  });
});

document.querySelectorAll("[data-feed-subtask-popover]").forEach((popover) => {
  popover.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

document.querySelectorAll("[data-open-task-panel]").forEach(bindTaskPanelTrigger);

function setTaskPanelExpanded(screen, isExpanded) {
  if (!screen) return;

  screen.classList.toggle("is-task-expanded", isExpanded);

  const button = screen.querySelector("[data-toggle-task-expand]");
  const icon = button?.querySelector("img");
  if (button) {
    button.setAttribute("aria-pressed", String(isExpanded));
    button.setAttribute("aria-label", isExpanded ? "패널 축소" : "패널 확장");
  }
  if (icon) {
    icon.src = isExpanded
      ? "./resources/Ico-System/app=collapse, style=line.svg"
      : "./resources/Ico-System/app=expand, style=line.svg";
  }
}

function getTaskPanelForScreen(screen) {
  const panel = document.querySelector(".task-detail-panel");
  if (screen && panel && panel.parentElement !== screen) {
    panel.parentElement?.classList.remove("has-task-panel", "is-task-expanded");
    panel.parentElement?.querySelector(".table-view-shell")?.classList.remove("has-task-panel");
    screen.append(panel);
  }
  return panel;
}

function openTaskPanel(source, screen = source.closest(".board-dashboard-screen, .workspace-home, .workspace-overview")) {
  const shell = source.closest(".table-view-shell") || screen?.querySelector(".table-view-shell");
  const panel = getTaskPanelForScreen(screen);
  if (!screen || !panel) return;
  const workspaceScroll = getWorkspaceScreenScrollState(screen);

  setTaskPanelExpanded(screen, false);
  panel.classList.remove("is-create");
  screen.querySelectorAll("[data-open-task-panel]").forEach((item) => {
    item.classList.toggle("is-selected", item === source);
  });
  shell?.classList.add("has-task-panel");
  screen.classList.add("has-task-panel");
  panel.hidden = false;

  const sourceTitle = getTaskPanelSourceTitle(source);
  const panelTitle = panel.querySelector(".task-view-body h2");
  if (sourceTitle && panelTitle) panelTitle.textContent = sourceTitle;
  restoreWorkspaceScreenScrollState(workspaceScroll);
}

function getWorkspaceScreenScrollState(screen) {
  if (!screen?.matches(".workspace-home, .workspace-overview")) return null;

  const content = screen.querySelector(".home-content, .overview-content");
  const scroller = screen.classList.contains("has-task-panel") && content ? content : screen;
  return {
    content,
    top: scroller.scrollTop,
  };
}

function restoreWorkspaceScreenScrollState(state) {
  if (!state?.content) return;

  window.requestAnimationFrame(() => {
    state.content.scrollTop = state.top;
  });
}

function getTaskPanelSourceTitle(source) {
  const activityTitle = source.querySelector("p b");
  if (activityTitle) {
    const titleClone = activityTitle.cloneNode(true);
    titleClone.querySelectorAll("em").forEach((item) => item.remove());
    return titleClone.textContent.trim();
  }

  const titleTarget = source.querySelector([
    ".feed-title-row h3",
    "[data-inline-title]",
    ".kanban-card h4",
    ".feed-pin-card strong",
    "strong",
  ].join(", "));
  if (titleTarget) return titleTarget.textContent.trim();

  if (source.matches(".gantt-left-row > button, [data-open-task-panel]")) {
    const titleClone = source.cloneNode(true);
    titleClone.querySelectorAll("img").forEach((item) => item.remove());
    return titleClone.textContent.trim();
  }

  return "";
}

function syncSelectedTaskPanelSource(screen, title) {
  if (!screen || !title) return;

  let matched = null;
  const activePanel = screen.querySelector(".board-view-panel.is-active") || screen;
  screen.querySelectorAll("[data-open-task-panel].is-selected").forEach((item) => {
    item.classList.remove("is-selected");
  });
  activePanel.querySelectorAll("[data-open-task-panel]").forEach((item) => {
    const isMatch = !matched && getTaskPanelSourceTitle(item) === title;
    item.classList.toggle("is-selected", isMatch);
    if (isMatch) matched = item;
  });
}

function bindTaskPanelTrigger(trigger) {
  trigger.addEventListener("click", (event) => {
    if (shouldSkipTaskPanelOpen(event.target)) return;
    openTaskPanel(trigger);
  });
  trigger.addEventListener("keydown", (event) => {
    if (event.target !== trigger || shouldSkipTaskPanelOpen(event.target)) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openTaskPanel(trigger);
  });
}

document.querySelectorAll("#workspaceHomeScreen #assignedTaskTitle, #workspaceHomeScreen #activityTitle, #workspaceOverviewScreen #overviewTaskTitle, #workspaceOverviewScreen #overviewActivityTitle").forEach((title) => {
  title.closest(".home-section")?.querySelectorAll(".task-row").forEach((row) => {
    row.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      openTaskPanel(row, title.closest(".prototype-screen"));
    });
  });
});

document.querySelector("#boardDashboardScreen .dashboard-activity")?.addEventListener("click", (event) => {
  const row = event.target.closest(".activity-timeline button");
  if (!row) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  openTaskPanel(row, document.getElementById("boardDashboardScreen"));
});

document.querySelectorAll("[data-gantt-tree-parent]").forEach((parentRow) => {
  const toggleIcon = parentRow.querySelector("button img");
  toggleIcon?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();

    const group = parentRow.dataset.ganttTreeParent;
    const board = parentRow.closest("[data-gantt-board]");
    const willCollapse = !parentRow.classList.contains("is-collapsed");

    parentRow.classList.toggle("is-collapsed", willCollapse);
    board?.querySelectorAll(`[data-gantt-tree-child="${group}"]`).forEach((row) => {
      row.classList.toggle("is-tree-collapsed", willCollapse);
    });
    board?.querySelectorAll(".gantt-bars").forEach(renderGanttDependencies);
  });
});

document.querySelectorAll("[data-toggle-task-expand]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const screen = button.closest(".board-dashboard-screen, .workspace-home, .workspace-overview");
    setTaskPanelExpanded(screen, !screen?.classList.contains("is-task-expanded"));
  });
});

document.querySelectorAll("[data-open-create-task]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    openCreateTaskPanel(button);
  });
});

document.querySelectorAll("[data-save-created-task]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const panel = button.closest(".task-detail-panel");
    const titleInput = panel?.querySelector("[data-create-task-title]");
    const title = titleInput?.value.trim() || "신규 협업 모듈 설계 작업 등록";
    const viewTitle = panel?.querySelector(".task-view-body h2");

    if (viewTitle) viewTitle.textContent = title;
    panel?.classList.remove("is-create");
    showToast("작업이 저장되었습니다.");
  });
});

function openCreateTaskPanel(trigger) {
  const screen = trigger.closest(".board-dashboard-screen");
  const shell = screen?.querySelector(".table-view-shell");
  const panel = getTaskPanelForScreen(screen);
  if (!screen || !panel) return;

  screen.querySelectorAll("[data-open-task-panel].is-selected").forEach((item) => {
    item.classList.remove("is-selected");
  });
  setTaskPanelExpanded(screen, false);
  shell?.classList.add("has-task-panel");
  screen.classList.add("has-task-panel");
  panel.classList.add("is-create");
  panel.hidden = false;

  const infoSection = panel.querySelector(".task-create-body .task-info-section");
  const infoToggle = infoSection?.querySelector("[data-task-section-toggle]");
  infoSection?.classList.add("is-collapsed");
  infoToggle?.setAttribute("aria-expanded", "false");

  panel.querySelector("[data-create-task-title]")?.focus();
}

function shouldSkipTaskPanelOpen(target) {
  const closest = target.closest?.bind(target);
  if (!closest) return false;

  if (closest("input, textarea, select, [contenteditable='true']")) return true;
  if (closest("[data-task-note-text]")) return true;
  if (closest(".person-cell.is-readonly")) return true;
  if (closest(".kanban-card[data-kanban-dragged='true']")) return true;

  const cell = closest("td");
  if (!cell) return false;

  return cell.cellIndex === 3 || cell.cellIndex === 10 || cell.cellIndex === 11;
}

document.querySelectorAll("[data-table-tree-toggle]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const group = button.dataset.tableTreeToggle;
    const willExpand = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(willExpand));
    button.setAttribute("aria-label", willExpand ? "하위 작업 접기" : "하위 작업 펼치기");

    document.querySelectorAll(`[data-task-group-child="${group}"]`).forEach((row) => {
      row.classList.toggle("is-tree-collapsed", !willExpand);
    });
  });
});

document.querySelectorAll("[data-close-task-panel]").forEach((button) => {
  button.addEventListener("click", () => {
    const screen = button.closest(".board-dashboard-screen, .workspace-home, .workspace-overview");
    const panel = screen?.querySelector(".task-detail-panel");
    if (!screen || !panel) return;

    screen.querySelector(".table-view-shell")?.classList.remove("has-task-panel");
    screen.querySelectorAll("[data-open-task-panel].is-selected").forEach((item) => {
      item.classList.remove("is-selected");
    });
    setTaskPanelExpanded(screen, false);
    screen.classList.remove("has-task-panel");
    panel.classList.remove("is-create");
    panel.hidden = true;
  });
});

document.querySelectorAll("[data-inline-title]").forEach(bindInlineTitle);

document.querySelectorAll("[data-cell-menu]").forEach(bindCellMenuTrigger);

function bindCellMenuTrigger(button) {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const menu = document.querySelector("[data-table-menu]");
    if (!menu) return;

    renderTableCellMenu(menu, button);
    const rect = button.getBoundingClientRect();
    menu.hidden = false;
    menu.style.left = `${rect.left}px`;
    menu.style.top = `${rect.bottom + 4}px`;
    menu.__target = button;
  });
}

document.querySelectorAll("[data-column-drag]").forEach((header) => {
  header.addEventListener("dragstart", () => {
    header.closest("table").dataset.dragColumn = String(header.cellIndex);
  });
  header.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  header.addEventListener("drop", (event) => {
    event.preventDefault();
    const table = header.closest("table");
    const from = Number(table.dataset.dragColumn);
    const to = header.cellIndex;
    if (Number.isNaN(from) || from === to) return;
    moveTableColumn(table, from, to);
    delete table.dataset.dragColumn;
  });
});

document.querySelectorAll("[data-table-scroll]").forEach((scrollArea) => {
  scrollArea.addEventListener("wheel", (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    scrollArea.scrollLeft += event.deltaY;
  }, { passive: false });
});

document.querySelectorAll("[data-gantt-horizontal-scroll]").forEach((scrollArea) => {
  scrollArea.addEventListener("wheel", (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    scrollArea.scrollLeft += event.deltaY;
  }, { passive: false });
});

document.querySelectorAll("[data-table-add-row]").forEach((row) => {
  row.addEventListener("click", (event) => {
    event.stopPropagation();
    addTableRow(row);
  });
});

document.querySelectorAll("[data-open-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.getElementById(button.dataset.openModal);
    if (!modal) return;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    modal.querySelector("input, textarea, button")?.focus();
  });
});

document.querySelectorAll("[data-picker-title]").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.getElementById("pickerModal");
    if (!modal) return;

    const title = button.dataset.pickerTitle;
    modal.querySelector("#pickerModalTitle").textContent = title;
    modal.querySelector("#pickerModalMessage").textContent = getPickerMessage(title);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    modal.querySelector("[data-close-modal]")?.focus();
  });
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => closeModal(button.closest(".modal-backdrop")));
});

document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) closeModal(backdrop);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal-backdrop.is-open").forEach(closeModal);
    document.querySelector("[data-table-menu]")?.setAttribute("hidden", "");
    closeBasicFilterPopovers();
    closeFilterOffcanvas();
    closeOverviewMenu();
    closeBoardPopovers();
    closeTaskPanelPopovers();
    closeTaskFieldPopovers();
  }
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".overview-breadcrumb")) return;
  if (event.target.closest(".board-popover, [data-popover-toggle]")) return;
  if (!event.target.closest("[data-toolbar-view-popover], [data-toolbar-view-toggle]")) {
    document.querySelectorAll("[data-toolbar-view-popover]").forEach((popover) => {
      popover.hidden = true;
    });
    document.querySelectorAll("[data-toolbar-view-toggle][aria-expanded='true']").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });
  }
  if (!event.target.closest("[data-basic-filter-popover], [data-basic-filter-toggle]")) {
    closeBasicFilterPopovers();
  }
  if (event.target.closest(".task-panel-popover, [data-task-popover-toggle]")) return;
  if (event.target.closest(".task-field-popover, [data-task-date-toggle], [data-task-select-toggle]")) return;
  if (!event.target.closest("[data-kanban-subtask-popover], [data-kanban-subtask-toggle]")) {
    document.querySelectorAll("[data-kanban-subtask-popover]").forEach((popover) => {
      popover.hidden = true;
    });
    document.querySelectorAll("[data-kanban-subtask-toggle][aria-expanded='true']").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });
  }
  if (!event.target.closest("[data-feed-subtask-popover], [data-feed-subtask-toggle]")) {
    document.querySelectorAll("[data-feed-subtask-popover]").forEach((popover) => {
      popover.hidden = true;
    });
    document.querySelectorAll("[data-feed-subtask-toggle][aria-expanded='true']").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });
  }
  if (!event.target.closest("[data-table-menu], [data-cell-menu]")) {
    document.querySelector("[data-table-menu]")?.setAttribute("hidden", "");
  }
  closeOverviewMenu();
  closeBoardPopovers();
  closeTaskPanelPopovers();
  closeTaskFieldPopovers();
});

document.querySelectorAll(".round-tabs button").forEach((tab) => {
  tab.addEventListener("click", () => {
    const tabs = tab.closest(".round-tabs").querySelectorAll("button");
    tabs.forEach((item) => {
      item.classList.toggle("is-active", item === tab);
      item.setAttribute("aria-selected", String(item === tab));
    });
  });
});

document.querySelectorAll("[data-activity-tab]").forEach((tab) => {
  tab.addEventListener("click", () => {
    const activity = tab.closest(".dashboard-activity");
    const target = tab.dataset.activityTab;
    if (!activity || !target) return;

    activity.querySelectorAll("[data-activity-tab]").forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    activity.querySelectorAll("[data-activity-panel]").forEach((panel) => {
      const isActive = panel.dataset.activityPanel === target;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  });
});

document.querySelectorAll(".chip-option").forEach((option) => {
  option.addEventListener("click", () => {
    option.parentElement.querySelectorAll(".chip-option").forEach((item) => {
      item.classList.remove("is-selected");
    });
    option.classList.add("is-selected");
  });
});

document.querySelectorAll(".switch").forEach((switchButton) => {
  switchButton.addEventListener("click", () => {
    const isOn = switchButton.classList.toggle("is-on");
    switchButton.setAttribute("aria-checked", String(isOn));
    const targetId = switchButton.dataset.toggleTarget;
    if (targetId) {
      document.getElementById(targetId)?.classList.toggle("is-hidden", !isOn);
    }
  });
});

document.querySelectorAll(".validity-button").forEach((button) => {
  button.addEventListener("click", () => {
    showToast("사용 가능한 ID입니다.");
  });
});

document.querySelectorAll(".color-swatch").forEach((swatch) => {
  swatch.addEventListener("click", () => {
    swatch.parentElement.querySelectorAll(".color-swatch").forEach((item) => {
      item.classList.remove("is-selected");
      item.textContent = "";
    });
    swatch.classList.add("is-selected");
    swatch.textContent = "✓";
  });
});

document.querySelectorAll("[data-route-target]").forEach((item) => {
  item.addEventListener("click", () => {
    if (item.closest("#boardDashboardScreen .dashboard-activity")) return;
    showToast(`${item.dataset.routeTarget} 화면으로 이동`);
  });
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      item.click();
    }
  });
});

function bindInlineTitle(button) {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const value = button.textContent.trim();
    const input = document.createElement("input");
    input.type = "text";
    input.value = value;
    input.setAttribute("aria-label", "작업 제목");
    button.replaceWith(input);
    input.focus();
    input.select();

    const save = () => {
      const nextButton = document.createElement("button");
      nextButton.type = "button";
      nextButton.dataset.inlineTitle = "";
      nextButton.textContent = input.value.trim() || value;
      input.replaceWith(nextButton);
      bindInlineTitle(nextButton);
    };

    input.addEventListener("keydown", (keyEvent) => {
      if (keyEvent.key === "Enter") input.blur();
    });
    input.addEventListener("blur", save, { once: true });
  });
}

function resizeTextareaToContent(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

function moveTableColumn(table, from, to) {
  const cols = Array.from(table.querySelectorAll("colgroup col"));
  const movingCol = cols[from];
  const targetCol = cols[to];
  if (movingCol && targetCol) {
    movingCol.parentElement.insertBefore(movingCol, from < to ? targetCol.nextSibling : targetCol);
  }

  table.querySelectorAll("tr").forEach((row) => {
    const cells = Array.from(row.children);
    const movingCell = cells[from];
    const targetCell = cells[to];
    if (!movingCell || !targetCell || movingCell.colSpan > 1 || targetCell.colSpan > 1) return;

    row.insertBefore(movingCell, from < to ? targetCell.nextSibling : targetCell);
  });
}

function addTableRow(trigger) {
  const table = trigger.closest("table") || trigger.closest(".board-table-area")?.querySelector(".board-table");
  const addRow = table?.querySelector(".table-add-row");
  const sourceRow = addRow?.previousElementSibling;
  if (!table || !addRow || !sourceRow) return;

  const nextRow = sourceRow.cloneNode(true);
  nextRow.classList.remove("is-selected", "is-tree-collapsed");
  nextRow.removeAttribute("data-task-group-parent");
  nextRow.removeAttribute("data-task-group-child");
  nextRow.dataset.openTaskPanel = "";

  const idCell = nextRow.children[1];
  if (idCell) idCell.textContent = getNextPlanId(table);

  const titleCell = nextRow.querySelector(".title-cell");
  if (titleCell) {
    titleCell.className = "title-cell";
    titleCell.innerHTML = "";
    const spacer = document.createElement("span");
    spacer.className = "table-title-spacer";
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "작업 제목 입력";
    input.setAttribute("aria-label", "작업 제목");
    titleCell.append(spacer, input);
    bindNewRowTitleInput(input);
    window.requestAnimationFrame(() => input.focus());
  }

  addRow.parentElement.insertBefore(nextRow, addRow);
  bindTaskPanelTrigger(nextRow);
  nextRow.querySelectorAll("[data-cell-menu]").forEach(bindCellMenuTrigger);
  nextRow.querySelectorAll("[data-inline-title]").forEach(bindInlineTitle);
}

function bindNewRowTitleInput(input) {
  input.addEventListener("click", (event) => event.stopPropagation());
  input.addEventListener("keydown", (event) => {
    event.stopPropagation();
    if (event.key === "Enter" || event.key === "Escape") {
      event.preventDefault();
      input.blur();
    }
  });
  input.addEventListener("blur", () => {
    const value = input.value.trim();
    if (!value) return;

    const button = document.createElement("button");
    button.type = "button";
    button.dataset.inlineTitle = "";
    button.textContent = value;
    input.replaceWith(button);
    bindInlineTitle(button);
  });
}

function getNextPlanId(table) {
  const ids = Array.from(table.querySelectorAll("tbody tr:not(.table-add-row) td:nth-child(2)"))
    .map((cell) => Number(cell.textContent.trim().replace("plan-", "")))
    .filter((value) => !Number.isNaN(value));
  const next = ids.length ? Math.max(...ids) + 1 : 1001;
  return `plan-${String(next).padStart(4, "0")}`;
}

function renderTableCellMenu(menu, target) {
  const type = target.dataset.cellMenu;
  menu.className = `table-cell-menu menu-${type || "default"}`;
  menu.innerHTML = "";

  if (type === "assignee") {
    [
      ["김지은", "navy"],
      ["박정훈", "violet"],
      ["윤대현", "yellow"],
      ["조민지", "rose"],
    ].forEach(([name, avatarClass]) => {
      const option = createMenuButton(name);
      option.innerHTML = `<span class="table-avatar ${avatarClass}">${name.slice(0, 1)}</span><span>${name}</span>`;
      option.addEventListener("click", () => {
        target.innerHTML = `<span class="table-avatar ${avatarClass}">${name.slice(0, 1)}</span>${name}`;
        menu.hidden = true;
      });
      menu.append(option);
    });
    return;
  }

  if (type === "stage") {
    ["요청", "담당자 배정", "시장조사", "초안 설계", "피드백 반영", "리뷰", "등록 완료"].forEach((label) => {
      const option = createMenuButton(label);
      option.addEventListener("click", () => {
        target.textContent = label;
        target.className = `table-chip ${getStageClass(label)}`;
        target.type = "button";
        target.dataset.cellMenu = "stage";
        menu.hidden = true;
      });
      menu.append(option);
    });
    return;
  }

  if (type === "state") {
    ["대기", "진행", "완료"].forEach((label) => {
      const option = createMenuButton(label);
      option.innerHTML = `<span class="table-chip ${getStateClass(label)}">${label}</span>`;
      option.addEventListener("click", () => {
        target.textContent = label;
        target.className = `table-chip ${getStateClass(label)}`;
        target.type = "button";
        target.dataset.cellMenu = "state";
        menu.hidden = true;
      });
      menu.append(option);
    });
    return;
  }

  if (type === "priority") {
    ["매우 낮음", "낮음", "보통", "높음", "매우 높음"].forEach((label) => {
      const option = createMenuButton(label);
      option.innerHTML = `<span class="priority-menu-chip ${getPriorityClass(label)}"><i></i>${label}</span>`;
      option.addEventListener("click", () => {
        target.textContent = label;
        target.className = `table-chip ${getPriorityClass(label)}`;
        target.type = "button";
        target.dataset.cellMenu = "priority";
        menu.hidden = true;
      });
      menu.append(option);
    });
    return;
  }

  if (type === "date") {
    menu.classList.add("menu-date");
    menu.append(createDateMenu(target, menu));
  }
}

function createMenuButton(label) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  return button;
}

function createDateMenu(target, menu) {
  const wrapper = document.createElement("div");
  wrapper.className = "table-date-menu";
  wrapper.innerHTML = `
    <div class="table-date-head">
      <button type="button" aria-label="이전 달"><img src="./resources/Ico-System/app=chevron-right-sm, style=line.svg" alt=""></button>
      <strong>2026년 1월</strong>
      <button type="button" aria-label="다음 달"><img src="./resources/Ico-System/app=chevron-right-sm, style=line.svg" alt=""></button>
    </div>
    <div class="table-date-week"><span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span></div>
    <div class="table-date-grid"></div>
  `;
  const grid = wrapper.querySelector(".table-date-grid");
  ["29", "30", "31", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"].forEach((day, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = day;
    if (index < 3 || index > 30) button.classList.add("is-muted");
    if (day === "27" && index > 20) button.classList.add("is-selected");
    button.addEventListener("click", () => {
      target.textContent = `2026-01-${day.padStart(2, "0")}`;
      menu.hidden = true;
    });
    grid.append(button);
  });
  return wrapper;
}

function getStageClass(label) {
  if (label === "등록 완료") return "chip-stage-done";
  if (label === "리뷰" || label === "요청") return "chip-stage-review";
  return "chip-stage-progress";
}

function getStateClass(label) {
  if (label === "완료") return "chip-state-done";
  if (label === "진행") return "chip-state-progress";
  return "chip-state-wait";
}

function getPriorityClass(label) {
  if (label === "낮음") return "chip-priority-low";
  if (label === "높음" || label === "매우 높음") return "chip-priority-high";
  if (label === "매우 낮음") return "chip-priority-very-low";
  return "chip-priority-normal";
}

function showTooltip(target) {
  const label = target.dataset.tooltip;
  if (!label) return;

  const rect = target.getBoundingClientRect();
  tooltip.textContent = label;
  tooltip.classList.toggle("is-above", target.dataset.tooltipPlacement === "top");
  if (target.dataset.tooltipPlacement === "top") {
    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.top = `${rect.top - 6}px`;
  } else {
    tooltip.style.left = `${rect.right + 6}px`;
    tooltip.style.top = `${rect.top + rect.height / 2}px`;
  }
  tooltip.classList.add("is-visible");
}

function hideTooltip() {
  tooltip.classList.remove("is-visible");
}

function closeOverviewMenu() {
  document.querySelectorAll("[data-overview-menu].is-open").forEach((menu) => {
    menu.classList.remove("is-open");
    menu.closest(".overview-breadcrumb")
      ?.querySelector("[data-overview-menu-toggle]")
      ?.setAttribute("aria-expanded", "false");
  });
}

function closeBoardPopovers() {
  document.querySelectorAll(".board-popover.is-open").forEach((popover) => {
    popover.classList.remove("is-open");
  });
  document.querySelectorAll("[data-popover-toggle][aria-expanded='true']").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
  });
}

function closeTaskPanelPopovers() {
  document.querySelectorAll(".task-panel-popover.is-open").forEach((popover) => {
    popover.classList.remove("is-open");
  });
  document.querySelectorAll("[data-task-popover-toggle][aria-expanded='true']").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
  });
}

function closeTaskFieldPopovers() {
  document.querySelectorAll(".task-field-popover.is-open").forEach((popover) => {
    popover.classList.remove("is-open");
  });
  document.querySelectorAll("[data-task-date-toggle][aria-expanded='true'], [data-task-select-toggle][aria-expanded='true']").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
  });
}

function closeBasicFilterPopovers() {
  document.querySelectorAll("[data-basic-filter-popover]").forEach((popover) => {
    popover.hidden = true;
  });
  document.querySelectorAll("[data-basic-filter-toggle][aria-expanded='true']").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
  });
}

function closeFilterOffcanvas() {
  const offcanvas = document.getElementById("boardFilterOffcanvas");
  if (!offcanvas) return;

  offcanvas.classList.remove("is-open");
  offcanvas.setAttribute("aria-hidden", "true");
  document.querySelectorAll("[data-open-filter-canvas][aria-expanded='true']").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
  });
}

function resetTaskPanelForNavigation(screenId) {
  const panel = document.querySelector(".task-detail-panel");
  document.querySelectorAll(".board-dashboard-screen, .workspace-home, .workspace-overview").forEach((screen) => {
    screen.classList.remove("has-task-panel", "is-task-expanded");
    screen.querySelector(".table-view-shell")?.classList.remove("has-task-panel");
    screen.querySelectorAll("[data-open-task-panel].is-selected").forEach((item) => {
      item.classList.remove("is-selected");
    });
  });
  if (!panel) return;

  panel.classList.remove("is-create");
  panel.hidden = true;

  const nextHost = screenId === "boardDashboardScreen"
    ? document.getElementById("boardDashboardScreen")
    : null;
  if (nextHost && panel.parentElement !== nextHost) {
    nextHost.append(panel);
  }
  setTaskPanelExpanded(panel.closest(".board-dashboard-screen, .workspace-home, .workspace-overview"), false);
}

function showScreen(screenId) {
  if (!screenId) return;
  const target = document.getElementById(screenId);
  if (!target) return;

  resetTaskPanelForNavigation(screenId);
  document.querySelectorAll(".prototype-screen").forEach((screen) => {
    screen.classList.toggle("is-active", screen === target);
  });
  syncLnbSelection(screenId);
  document.getElementById("stage")?.scrollTo({ top: 0, behavior: "smooth" });
}

function showLnbPanel(panelId) {
  if (!panelId) return;
  const target = document.getElementById(panelId);
  if (!target) return;

  document.querySelectorAll(".lnb-panel").forEach((panel) => {
    panel.classList.toggle("is-active", panel === target);
  });
}

function syncLnbSelection(screenId) {
  if (screenId !== "workspaceOverviewScreen" && screenId !== "workspaceHomeScreen" && screenId !== "boardDashboardScreen") return;

  document.querySelectorAll(".lnb-home, .lnb-item").forEach((item) => {
    item.classList.remove("is-selected");
  });
  document.querySelector(".lnb-panel.is-active")
    ?.querySelector(`[data-screen-target="${screenId}"]`)
    ?.classList.add("is-selected");
}

function clearLnbSelection(panelId) {
  const target = document.getElementById(panelId);
  if (!target) return;

  target.querySelectorAll(".lnb-home, .lnb-item").forEach((item) => {
    item.classList.remove("is-selected");
  });
}

function closeModal(backdrop) {
  if (!backdrop) return;
  backdrop.classList.remove("is-open");
  backdrop.setAttribute("aria-hidden", "true");
}

function getPickerMessage(title) {
  const messages = {
    "폴더 선택": "본 페이지는 웹 프로토타입으로 실제 화면과 다릅니다. 실제 화면에서는 폴더 선택 팝업이 뜰 예정입니다.",
    "템플릿 선택": "본 페이지는 웹 프로토타입으로 실제 화면과 다릅니다. 실제 화면에서는 템플릿 선택 팝업이 뜰 예정입니다.",
    "조직도 선택": "본 페이지는 웹 프로토타입으로 실제 화면과 다릅니다. 실제 화면에서는 조직도 선택 팝업이 뜰 예정입니다.",
    "아이콘 선택": "본 페이지는 웹 프로토타입으로 실제화면과 다릅니다. 실제 화면에서는 아이콘 선택 팝업이 뜰 예정입니다.",
    "커스텀 항목 추가": "본 페이지는 웹 프로토타입으로 실제 화면과 다릅니다. 실제 화면에서는 커스텀 항목 추가 팝업이 뜰 예정입니다.",
    "작업 플로우 선택": "본 페이지는 웹 프로토타입으로 실제 화면과 다릅니다. 실제 화면에서는 작업 플로우 선택 팝업이 뜰 예정입니다.",
    "순서 변경": "본 페이지는 웹 프로토타입으로 실제 화면과 다릅니다. 실제 화면에서는 순서 변경 팝업이 뜰 예정입니다.",
    "보기 추가": "본 페이지는 웹 프로토타입으로 실제 화면과 다릅니다. 실제 화면에서는 보기 추가 팝업이 뜰 예정입니다.",
  };

  return messages[title] || "본 페이지는 웹 프로토타입으로 실제 화면과 다릅니다.";
}

function showToast(message) {
  let toast = document.querySelector(".demo-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "demo-toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1400);
}
