export const byte = 8
export const uint = 32


export default (
  function bitfield(){
    return {
      create(size: number){
        this.size = size
        this.data = {}
        return this;
      },
      prop(name: string, size: number, type: number, value?: any){
        this.data[name] = value === undefined ? type : value
        return this
      },
      get(){
        return this.data
      }
    }
  }
)()