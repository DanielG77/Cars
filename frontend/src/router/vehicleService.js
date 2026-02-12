// Simple wrapper fetch; ajusta la URL del backend según tu configuración
export async function checkVehicle(payload) {
    // payload: { make, model, plate }
    const base = import.meta.env.VITE_API_BASE || ''
    const url = `${base}/api/vehicles/check`


    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })


    if (!res.ok) {
        const text = await res.text()
        throw new Error(`HTTP ${res.status}: ${text}`)
    }


    // Se espera { exists: true } o { exists: false } o simplemente true/false
    const contentType = res.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
        const data = await res.json()
        // soporta distintas estructuras
        if (typeof data === 'boolean') return data
        if ('exists' in data) return Boolean(data.exists)
        // fallback: intenta buscar first boolean property
        const boolVal = Object.values(data).find(v => typeof v === 'boolean')
        if (typeof boolVal === 'boolean') return boolVal
        throw new Error('Respuesta JSON inesperada')
    }


    // si viene un texto plano 'true' / 'false'
    const text = (await res.text()).trim().toLowerCase()
    if (text === 'true') return true
    if (text === 'false') return false
    throw new Error('Respuesta inesperada del servidor')
}