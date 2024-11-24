"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock data - replace with actual data fetching in a real application
const mockUserData = {
  1: { name: "Alice Johnson", role: "Desenvolvedor" },
  2: { name: "Bob Smith", role: "Designer" },
  3: { name: "Charlie Brown", role: "Gerente de Projeto" },
  4: { name: "Diana Ross", role: "QA Analyst" },
};

const mockMonthlyData = {
  "2024-09": {
    1: 0,
    2: 8,
    3: 8.5,
    4: 8,
    5: 8,
    6: 7.5,
    7: 0,
    8: 0,
    9: 8,
    10: 8,
    11: 8.5,
    12: 8,
    13: 8,
    14: 3,
    15: 0,
    16: 8,
    17: 8.5,
    18: 8,
    19: 8,
    20: 8,
    21: 0,
    22: 4,
    23: 8,
    24: 8,
    25: 8.5,
    26: 8,
    27: 7.5,
    28: 2,
    29: 0,
    30: 8,
  },
  "2024-10": {
    1: 7.5,
    2: 8,
    3: 8,
    4: 7,
    5: 0,
    6: 0,
    7: 8,
    8: 8,
    9: 8,
    10: 7.8,
    11: 8,
    12: 0,
    13: 0,
    14: 8,
    15: 8.2,
    16: 8.3,
    17: 8,
    18: 8,
    19: 0.5,
    20: 3,
    21: 8,
    22: 5,
    23: 8,
    24: 8,
    25: 8,
    26: 3,
    27: 0,
    28: 8,
    29: 8,
    30: 8,
    31: 8,
  },
  "2024-11": {
    1: 8,
    2: 2,
    3: 1.5,
    4: 8,
    5: 8,
    6: 8.5,
    7: 8,
    8: 8,
    9: 0,
    10: 0,
    11: 8,
    12: 8,
    13: 8,
    14: 8.5,
    15: 0,
    16: 0,
    17: 0.5,
    18: 8,
    19: 8,
    20: 0,
    21: 8.5,
    22: 8,
    23: 2.3,
    24: 0,
    25: 8,
    26: 8,
    27: 8,
    28: 8.5,
    29: 8,
    30: 0,
  },
};

export function UserReport({ userId }: { userId: string }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const user = mockUserData[userId];

  const formatMonth = (date: Date) => {
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const getMonthKey = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthKey = getMonthKey(currentDate);
  const monthData = mockMonthlyData[monthKey] || {};

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getColorForHours = (hours, dayOfWeek, day, currentDate) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const isFutureDate =
      currentYear < currentDate.getFullYear() ||
      (currentYear === currentDate.getFullYear() &&
        currentMonth < currentDate.getMonth()) ||
      (currentYear === currentDate.getFullYear() &&
        currentMonth === currentDate.getMonth() &&
        today.getDate() < day);

    const isToday =
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear();

    if (isFutureDate) {
      return "bg-gray-300";
    }

    if (isToday) {
      return "bg-gray-400";
    }

    if (dayOfWeek === 6 || dayOfWeek === 0) {
      return hours > 0 ? "bg-green-400" : "bg-gray-300";
    }
    if (hours < 8) return "bg-red-400";
    if (hours > 8) return "bg-green-400";
    return "bg-blue-400";
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const calendar = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendar.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDateInstance = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const dayOfWeek = currentDateInstance.getDay();
      const hours = monthData[day] || 0;
      const colorClass = getColorForHours(hours, dayOfWeek, day, currentDate);

      calendar.push(
        <div key={day} className={`p-2 border ${colorClass}`}>
          <div className="font-bold">{day}</div>
          <div>{hours} horas</div>
        </div>
      );
    }

    return calendar;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {user.name} - {user.role}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Button
              onClick={() => navigateMonth("prev")}
              variant="outline"
              size="icon"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-semibold">
              {formatMonth(currentDate)}
            </span>
            <Button
              onClick={() => navigateMonth("next")}
              variant="outline"
              size="icon"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
              <div key={day} className="font-bold text-center">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
