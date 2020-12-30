const reset = [
    "WEAPON_BAT",
    "WEAPON_KNIFE",
    "WEAPON_NIGHTSTICK",
    "WEAPON_STUNGUN",
    "WEAPON_HATCHET",
    "WEAPON_FLASHLIGHT",
    "WEAPON_KNUCKLE",
    "WEAPON_SWITCHBLADE",
    "WEAPON_BOTTLE",
    "WEAPON_DAGGER",
    "WEAPON_POOLCUE",
    "WEAPON_WRENCH",
    "WEAPON_BATTLEAXE",
    "WEAPON_HAMMER",
    "WEAPON_GOLFCLUB",
    "WEAPON_CROWBAR",
    "WEAPON_LIGHTSABERBLUE",
    "WEAPON_LIGHTSABERRED",
    "WEAPON_LIGHTSABERPUR",
    "WEAPON_LIGHTSABERGRE",
    "WEAPON_LIGHTSABERWHITE",
    "WEAPON_LIGHTSABERBLACK",
    "WEAPON_LIGHTSABERPINK",
    "WEAPON_UNICORNBAT",
    "WEAPON_BONESAW",
    "WEAPON_BREAD",
    "WEAPON_DILDO",
    "WEAPON_KIKETSUSWORD",
    "WEAPON_LUCILLE",
];

export const weaponReset = (weapon) => {
    if (reset.findIndex(item => item === weapon.name) !== -1) {
        weapon.ammo = 0;
        return weapon;
    } else {
        weapon.ammo = 48;
        return weapon;
    }
};
