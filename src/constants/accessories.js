export const ACCESSORY_CABLE_TRAY = 49
export const ACCESSORY_DRAWER = 39
export const ACCESSORY_RETRACT_SOCKET = 129
export const ACCESSORY_SLIDING_SOCKET = 149
export const ACCESSORY_CASTOR_4PCS = 39.9 // standard rectangle desks
export const ACCESSORY_CASTOR_6PCS = 59.9 // L-shape desks (3-leg base needs 6 wheels)
export const ACCESSORY_RISER_SMALL = 69 // 600×200×120mm
export const ACCESSORY_RISER_LARGE = 89 // 1000×200×120mm

// 🔴 New Add-Ons (#14, #23, #24). Images expected as white-bg PNGs in
//    /images/accessories/ — BYD to supply final product photos.
export const ACCESSORY_MONITOR_ARM_SINGLE = 49
export const ACCESSORY_MONITOR_ARM_DUAL = 89
export const ACCESSORY_CPU_MOUNT = 59
export const ACCESSORY_CABLE_ORGANISER = 19.9
export const ACCESSORY_WARRANTY = 60 // Extended warranty (3+2 Yrs)
export const ACCESSORY_ERGO_CHAIR = 199 // Ergonomic Chair (Ergo 608)
export const ACCESSORY_FRAME_STABILIZER = 69.9 // #23
export const ACCESSORY_ANTI_WOBBLE = 14.9 // #24 Anti-Wobble Stabilizer (3D printed)

// Shared new-add-on catalogue (#14, #23, #24). Images: uniform white-bg PNGs.
export const ADDONS_CATALOG = [
  { id: 'monitorSingle', label: 'Single Monitor Arm', price: ACCESSORY_MONITOR_ARM_SINGLE, image: 'images/accessories/monitor-arm-single.png' },
  { id: 'monitorDual', label: 'Dual Monitor Arm', price: ACCESSORY_MONITOR_ARM_DUAL, image: 'images/accessories/monitor-arm-dual.png' },
  { id: 'cpuMount', label: 'CPU Mount', price: ACCESSORY_CPU_MOUNT, image: 'images/accessories/cpu-mount.png' },
  { id: 'cableOrganiser', label: 'Cable Organiser Pack', price: ACCESSORY_CABLE_ORGANISER, image: 'images/accessories/cable-organiser.png' },
  { id: 'warranty', label: 'Extended Warranty (3+2 Yrs)', price: ACCESSORY_WARRANTY, image: 'images/accessories/warranty.png' },
  { id: 'ergoChair', label: 'Ergonomic Chair (Ergo 608)', price: ACCESSORY_ERGO_CHAIR, image: 'images/accessories/ergo-chair.png' },
  { id: 'frameStabilizer', label: 'Frame Stabilizer', price: ACCESSORY_FRAME_STABILIZER, image: 'images/accessories/frame-stabilizer.png' },
  { id: 'antiWobble', label: 'Anti-Wobble Stabilizer (3D Printed)', price: ACCESSORY_ANTI_WOBBLE, image: 'images/accessories/anti-wobble.png' },
]
