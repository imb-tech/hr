import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Input, Textarea } from "@heroui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { DatePicker } from "@heroui/react";
import { cn } from "@heroui/theme";
import {
  AlignLeft,
  CheckSquare,
  Eye,
  GanttChartSquare,
  Plus,
  Trash2,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { CardSidebar } from "./card-sidebar";

interface Member {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface Label {
  id: string;
  text: string;
  color: string;
}

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface Activity {
  id: string;
  user: { name: string; avatarUrl?: string };
  action: string;
  text?: string; // For comments
  timestamp: string;
}

interface CardData {
  title: string;
  list: string;
  members: Member[];
  dueDate: string | null;
  description: string;
  activities: Activity[];
  labels: Label[];
  checklist: { title: string; items: ChecklistItem[] } | null;
}

const initialCardData: CardData = {
  title: "rtakjsahdks",
  list: "TO DO",
  members: [
    { id: "user-ozodbek", name: "Ozodbek", avatarUrl: "/placeholder-user.jpg" },
  ],
  dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .substring(0, 16), // Tomorrow, formatted for datetime-local
  description: "Initial description of the task.",
  activities: [
    {
      id: "activity-1",
      user: { name: "ozodbek", avatarUrl: "/placeholder-user.jpg" },
      action: "copied this card from rtakjsahdks in list To Do",
      timestamp: "2 hours ago",
    },
  ],
  labels: [],
  checklist: null,
};

const availableLabels: Label[] = [
  { id: "label-1", text: "Bug", color: "bg-red-500" },
  { id: "label-2", text: "Feature", color: "bg-blue-500" },
  { id: "label-3", text: "Docs", color: "bg-green-500" },
  { id: "label-4", text: "Urgent", color: "bg-yellow-500" },
  { id: "label-5", text: "Marketing", color: "bg-purple-500" },
];

export function TaskCardModal() {
  const [cardData, setCardData] = useState<CardData>(initialCardData);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(cardData.title);
  const [newMemberName, setNewMemberName] = useState("");
  const [newChecklistItemText, setNewChecklistItemText] = useState("");
  const [newChecklistTitle, setNewChecklistTitle] = useState("Checklist");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value);
  };

  const saveTitle = () => {
    setCardData((prev) => ({ ...prev, title: currentTitle }));
    setIsEditingTitle(false);
    addActivity(`Sarlavhasiga o'zgartirildi "${currentTitle}"`);
  };

  const handleDescriptionChange = (e: any) => {
    setCardData((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleDescriptionBlur = () => {
    if (cardData.description !== initialCardData.description) {
      addActivity("tavsifni yangiladi.");
    }
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value ? e.target.value : null;
    setCardData((prev) => ({ ...prev, dueDate: newDate }));
    if (newDate) {
      addActivity(
        `Muddatini belgilang ${new Date(newDate).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "numeric", hour12: true })}`,
      );
    } else {
      addActivity(`muddatini olib tashladi.`);
    }
  };

  const addActivity = (actionText: string, commentText?: string) => {
    const newActivity: Activity = {
      id: `activity-${Date.now()}`,
      user: {
        name: "Current User",
        avatarUrl: "/placeholder.svg?width=32&height=32",
      },
      action: actionText,
      text: commentText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setCardData((prev) => ({
      ...prev,
      activities: [newActivity, ...prev.activities],
    }));
  };

  const handleAddMember = () => {
    if (newMemberName.trim() === "") return;
    const newMember: Member = {
      id: `member-${Date.now()}`,
      name: newMemberName,
      avatarUrl: `/placeholder.svg?width=32&height=32&text=${newMemberName.substring(0, 1)}`,
    };
    setCardData((prev) => ({ ...prev, members: [...prev.members, newMember] }));
    addActivity(`added ${newMemberName} to this card.`);
    setNewMemberName("");
  };

  const handleRemoveMember = (memberId: string) => {
    const memberToRemove = cardData.members.find((m) => m.id === memberId);
    setCardData((prev) => ({
      ...prev,
      members: prev.members.filter((member) => member.id !== memberId),
    }));
    if (memberToRemove) {
      addActivity(`removed ${memberToRemove.name} from this card.`);
    }
  };

  const toggleLabel = (label: Label) => {
    setCardData((prev) => {
      const isLabelSelected = prev.labels.find((l) => l.id === label.id);
      if (isLabelSelected) {
        addActivity(`removed label "${label.text}".`);
        return {
          ...prev,
          labels: prev.labels.filter((l) => l.id !== label.id),
        };
      } else {
        addActivity(`added label "${label.text}".`);
        return { ...prev, labels: [...prev.labels, label] };
      }
    });
  };

  const handleAddChecklist = () => {
    if (cardData.checklist) return;
    setCardData((prev) => ({
      ...prev,
      checklist: { title: newChecklistTitle || "Checklist", items: [] },
    }));
    addActivity(`added checklist "${newChecklistTitle || "Checklist"}".`);
    setNewChecklistTitle("Checklist");
  };

  const handleAddChecklistItem = () => {
    if (!cardData.checklist || newChecklistItemText.trim() === "") return;
    const newItem: ChecklistItem = {
      id: `item-${Date.now()}`,
      text: newChecklistItemText,
      completed: false,
    };
    setCardData((prev) => ({
      ...prev,
      checklist: {
        ...prev.checklist!,
        items: [...prev.checklist!.items, newItem],
      },
    }));
    addActivity(
      `added "${newChecklistItemText}" to checklist "${cardData.checklist.title}".`,
    );
    setNewChecklistItemText("");
  };

  const toggleChecklistItem = (itemId: string) => {
    if (!cardData.checklist) return;
    let itemText = "";
    setCardData((prev) => ({
      ...prev,
      checklist: {
        ...prev.checklist!,
        items: prev.checklist!.items.map((item) => {
          if (item.id === itemId) {
            itemText = item.text;
            return { ...item, completed: !item.completed };
          }
          return item;
        }),
      },
    }));
    const item = cardData.checklist.items.find((i) => i.id === itemId);
    if (item) {
      addActivity(
        `${item.completed ? "unmarked" : "marked"} "${itemText}" as complete.`,
      );
    }
  };

  const handleRemoveChecklistItem = (itemId: string) => {
    if (!cardData.checklist) return;
    const itemToRemove = cardData.checklist.items.find(
      (item) => item.id === itemId,
    );
    setCardData((prev) => ({
      ...prev,
      checklist: {
        ...prev.checklist!,
        items: prev.checklist!.items.filter((item) => item.id !== itemId),
      },
    }));
    if (itemToRemove) {
      addActivity(
        `removed "${itemToRemove.text}" from checklist "${cardData.checklist.title}".`,
      );
    }
  };

  const getChecklistProgress = () => {
    if (!cardData.checklist || cardData.checklist.items.length === 0) return 0;
    const completedItems = cardData.checklist.items.filter(
      (item) => item.completed,
    ).length;
    return Math.round((completedItems / cardData.checklist.items.length) * 100);
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="flex-grow col-span-8 space-y-6 overflow-y-auto no-scrollbar-x h-[75vh]">
        <div className="flex items-center space-x-3">
          <GanttChartSquare className="h-6 w-6 " />
          {isEditingTitle ? (
            <Input
              type="text"
              value={currentTitle}
              onChange={handleTitleChange}
              onBlur={saveTitle}
              onKeyDown={(e) => e.key === "Enter" && saveTitle()}
              autoFocus
            />
          ) : (
            <h2
              className="text-2xl font-semibold text-slate-100 cursor-text"
              onClick={() => {
                setCurrentTitle(cardData.title);
                setIsEditingTitle(true);
              }}
            >
              {cardData.title}
            </h2>
          )}
        </div>

        {cardData.labels.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold mb-1">Yorliqlar</h3>
            <div className="flex flex-wrap gap-1">
              {cardData.labels.map((label) => (
                <span
                  key={label.id}
                  className={cn(
                    "px-2 py-0.5 text-xs rounded-sm text-white",
                    label.color,
                  )}
                >
                  {label.text}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <div>
            <h3 className="text-xs font-semibold mb-1">A'ZOLAR</h3>
            <div className="flex items-center space-x-1 flex-wrap gap-1">
              {cardData.members.map((member) => (
                <Popover key={member.id}>
                  <PopoverTrigger asChild>
                    <Avatar size="md" name="AO" />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2">
                    <Button
                      color="danger"
                      size="sm"
                      onPress={() => handleRemoveMember(member.id)}
                    >
                      O'chirish {member.name}
                    </Button>
                  </PopoverContent>
                </Popover>
              ))}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="solid"
                    className="rounded-full min-w-3 px-3"
                    size="md"
                  >
                    <Plus size={18} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2">
                  <Input
                    placeholder="A'zolar nomi"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="mb-2"
                  />
                  <Button
                    onPress={handleAddMember}
                    size="sm"
                    color="primary"
                    className="w-full"
                  >
                    A'zo qo'shish
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold mb-1">Ogohlantirishlar</h3>
            <Button variant="solid" className="w-full justify-start">
              <Eye className="mr-2 h-4 w-4" /> Ko'rish
            </Button>
          </div>
          <div>
            <h3 className="text-xs font-semibold mb-1">MUDDATI</h3>
            <DatePicker
              onVolumeChange={handleDueDateChange}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <AlignLeft className="h-5 w-5 text-slate-400" />
            <h3 className="text-lg font-semibold text-slate-100">Tavsif</h3>
          </div>
          <Textarea
            placeholder="Batafsil tavsif qo'shing..."
            value={cardData.description}
            onChange={(e) => handleDescriptionChange(e)}
            onBlur={handleDescriptionBlur}
          />
        </div>

        {cardData.checklist && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckSquare className="h-5 w-5 text-slate-400" />
                <h3 className="text-lg font-semibold text-slate-100">
                  {cardData.checklist.title}
                </h3>
              </div>
              <Button
                color="danger"
                variant="ghost"
                size="sm"
                onPress={() => {
                  addActivity(
                    `deleted checklist "${cardData.checklist?.title}".`,
                  );
                  setCardData((prev) => ({ ...prev, checklist: null }));
                }}
              >
                Ro'yxatlarni o'chirish
              </Button>
            </div>
            <div className={cn("text-xs mb-2 bg-zinc-800 rounded-md ml-8",
            )}>{getChecklistProgress()}%</div>
            <div className="space-y-1 ml-8">
              {cardData.checklist.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-2 group"
                >
                  <Checkbox
                    id={`item-${item.id}`}
                    checked={item.completed}
                    onChange={() => toggleChecklistItem(item.id)}
                    className="border-slate-500 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                  />
                  <label
                    htmlFor={`item-${item.id}`}
                    className={cn(
                      "flex-grow text-sm",
                      item.completed && "line-through text-slate-500",
                    )}
                  >
                    {item.text}
                  </label>
                  <span
                    className="opacity-0 cursor-pointer group-hover:opacity-100 bg-zinc-800 p-2 rounded-md"
                    onClick={() => handleRemoveChecklistItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4  hover:text-red-400" />
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2 ml-8">
              <Input
                placeholder="Element qo'shing"
                value={newChecklistItemText}
                onChange={(e) => setNewChecklistItemText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddChecklistItem()}
              />
              <Button
                color="primary"
                onPress={handleAddChecklistItem}
                size="md"
              >
                Qo'shish
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-4">
        <CardSidebar
          onAddLabelClick={() => {}}
          availableLabels={availableLabels}
          selectedLabels={cardData.labels}
          onToggleLabel={toggleLabel}
          onAddChecklist={handleAddChecklist}
          hasChecklist={!!cardData.checklist}
        />
      </div>
    </div>
  );
}
