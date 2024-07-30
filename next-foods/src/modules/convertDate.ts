export async function convertDate(now: Date) : Promise<string>{
    const context = `${now.getFullYear()}/${String(now.getMonth() + 1)
    .padStart(2, '0')}/${String(now.getDate())
        .padStart(2, '0')}(${['日', '月', '火', '水', '木', '金', '土'][now.getDay()]}) ${String(now.getHours())
            .padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds())
                .padStart(2, '0')}`;[]
    return context;            
}