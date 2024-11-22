import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

export function ProjectTable({ projects, updateProjectTime, currentWeekStart }) {
  const [totals, setTotals] = useState({})
  const [weekDays, setWeekDays] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentWeekStart)
      day.setDate(currentWeekStart.getDate() + i)
      days.push(day)
    }
    setWeekDays(days)

    const newTotals = days.reduce((acc, day) => {
      const dayString = day.toISOString().split('T')[0]
      acc[dayString] = projects.reduce((sum, project) => {
        const time = parseFloat((project.time && project.time[dayString]) || '0')
        return sum + (isNaN(time) ? 0 : time)
      }, 0)
      return acc
    }, {})
    setTotals(newTotals)
  }, [projects, currentWeekStart])

  const formatTime = (time) => {
    const hours = Math.floor(time)
    const minutes = Math.round((time - hours) * 60)
    return `${hours}h${minutes.toString().padStart(2, '0')}m`
  }

  const handleTimeChange = (index, day, value) => {
    if (!isFutureDate(new Date(day)) && /^\d*\.?\d*$/.test(value)) {
      const numericValue = parseFloat(value)
      if (numericValue > 24) {
        setError(`Não é possível registrar mais de 24 horas em um dia. (Projeto: ${projects[index].name}, Data: ${new Date(day).toLocaleDateString('pt-BR')})`)
        return
      }
      
      const newTotal = projects.reduce((sum, project, i) => {
        if (i === index) {
          return sum + numericValue
        }
        return sum + parseFloat(project.time && project.time[day] || '0')
      }, 0)

      if (newTotal > 24) {
        setError(`O total de horas para o dia ${new Date(day).toLocaleDateString('pt-BR')} não pode exceder 24 horas.`)
        return
      }

      setError(null)
      updateProjectTime(index, day, value)
    }
  }

  const isToday = (date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  const isFutureDate = (date) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set to end of current day
    return date > today;
  }

  const totalAllDays = Object.values(totals).reduce((sum, value) => sum + value, 0)

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Projeto</TableHead>
              <TableHead className="font-bold">Papel</TableHead>
              {weekDays.map((day, index) => (
                <TableHead key={index} className={`font-bold ${isToday(day) ? 'bg-primary text-primary-foreground' : ''}`}>
                  {day.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' })}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow key={index}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.role}</TableCell>
                {weekDays.map((day, dayIndex) => {
                  const dayString = day.toISOString().split('T')[0]
                  const isFuture = isFutureDate(day)
                  return (
                    <TableCell key={dayIndex} className={isToday(day) ? 'bg-primary/10' : ''}>
                      <Input
                        type="text"
                        value={(project.time && project.time[dayString]) || ''}
                        onChange={(e) => handleTimeChange(index, dayString, e.target.value)}
                        placeholder="0.0"
                        className={`w-20 ${isFuture ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isFuture}
                      />
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="font-bold">Total por Dia</TableCell>
              {weekDays.map((day, index) => {
                const dayString = day.toISOString().split('T')[0]
                return (
                  <TableCell key={index} className={`font-bold ${isToday(day) ? 'bg-primary text-primary-foreground' : ''}`}>
                    {formatTime(totals[dayString] || 0)}
                  </TableCell>
                )
              })}
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} className="font-bold">Total Geral</TableCell>
              <TableCell colSpan={7} className="font-bold">{formatTime(totalAllDays)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}

