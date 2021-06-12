const toString = (v: string | number | boolean) => v.toString()

export function H1(...words: (string | number | boolean)[]) {
   console.log('#', ...words.map(toString))
}

export function H2(...words: (string | number | boolean)[]) {
   console.log('##', ...words.map(toString))
}

export function H3(...words: (string | number | boolean)[]) {
   console.log('###', ...words.map(toString))
}

export function tableHead(...heads: string[]) {
   console.log('|' + heads.join('|') + '|')
   const line = heads.map(() => '-')
   console.log('|' + line.join('|') + '|')
}

export function tableRow(...values: unknown[]) {
   values = values.map((v) => {
      if (typeof v === 'number') v = v.toFixed(2)
      return v
   })
   console.log('|' + values.join('|') + '|')
}