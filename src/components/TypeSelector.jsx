import TypeCard from './ui/TypeCard'

export default function TypeSelector({ types, activeId, onSelect }) {
  return (
    <>
      {types.map((t) => (
        <TypeCard
          key={t.id}
          active={activeId === t.id}
          onClick={() => onSelect(t.id)}
          title={t.title}
          subtitle={t.subtitle}
        />
      ))}
    </>
  )
}
