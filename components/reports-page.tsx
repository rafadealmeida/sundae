"use client";

import { SetStateAction, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector,
  LabelList,
} from "recharts";
import { ActiveShape } from "recharts/types/util/types";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

// Mock data - replace with actual data from your API
const projectData = [
  { name: "MPA", value: 80 },
  { name: "Sesc", value: 16 },
  { name: "Sesc App", value: 34 },
];

const weeklyData = [
  { day: "Segunda", MPA: 4, "Sesc App": 2 },
  { day: "Terça", MPA: 3, Sesc: 4, "Sesc App": 3 },
  { day: "Quarta", MPA: 5, Sesc: 2, "Sesc App": 4 },
  { day: "Quinta", MPA: 2, Sesc: 5, "Sesc App": 1 },
  { day: "Sexta", MPA: 3, Sesc: 3, "Sesc App": 5 },
];

const monthlyData = [
  { month: "Jan", horas: 6 },
  { month: "Fev", horas: -8 },
  { month: "Mar", horas: 8 },
  { month: "Abr", horas: 1 },
  { month: "Mai", horas: -13 },
  { month: "Jun", horas: 2 },
  { month: "Jul", horas: 1.5 },
  { month: "Ago", horas: -1 },
  { month: "Set", horas: -0.5 },
  { month: "Out", horas: 2 },
  { month: "Nov", horas: 16 },
  { month: "Dez", horas: 0 },
];

const getBarColor = (hours: number) => {
  if (hours > 0) return "#4CAF50";
  if (hours < 0) return "#F44336";
  return "#8884d8";
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function ReportsPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: unknown, index: SetStateAction<number>) => {
    setActiveIndex(index);
  };

  return (
    <div className="container mx-auto p-4 space-y-8 ">
      <h1 className="text-3xl font-bold mb-6">Relatórios</h1>

      <Card className="w-2/3 mx-auto">
        <CardHeader>
          <CardTitle>Tempo Gasto por Projeto</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px] mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={
                    renderActiveShape as ActiveShape<PieSectorDataItem>
                  }
                  data={projectData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                >
                  {projectData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="w-2/3 mx-auto">
        <CardHeader>
          <CardTitle>Tempo Gasto por Dia da Semana e Projeto</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="MPA" stackId="a" fill="#0088FE" />
                <Bar dataKey="Sesc" stackId="a" fill="#00C49F" />
                <Bar dataKey="Sesc App" stackId="a" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="w-2/3 mx-auto">
        <CardHeader>
          <CardTitle>Horas Positivas e Negativas por Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="horas">
                  <LabelList position="top" dataKey="month" fillOpacity={1} />
                  {monthlyData.map((item) => (
                    <Cell key={item.month} fill={getBarColor(item.horas)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

const renderActiveShape = (props: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: { name: string };
  percent: number;
  value: number;
}) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <text x={cx} y={cy + 20} dy={8} textAnchor="middle" fill={fill}>
        {`${(percent * 100).toFixed(2)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value} horas`}</text>
    </g>
  );
};
