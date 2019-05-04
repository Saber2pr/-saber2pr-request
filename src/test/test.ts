import { preserve } from '../core/utils/preserve'

console.log(preserve({ name: 'test' }, { name: 'new', target: 'xxx' }))
console.log(Object.assign({ name: 'test' }, { name: 'new', target: 'xxx' }))
