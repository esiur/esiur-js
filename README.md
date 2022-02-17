# Esiur.JS
Esiur Library for Javascript

# Usage
npm run demo

import io;
import sys;
import json;

res = json.load(sys.stdin)
temp = res['main']['temp']
hum = res['main']['humidity']
vis = res['visibility']
wind = res['wind']['speed']
desc = res['weather'][0]['description']

sys.stdout.buffer.write(f'مرحبا بكم في أعمال, درجة الحرارة {temp} مئوية, الرطوبة {hum}%, مدى الرؤية {vis} متر, سرعة الرياح {wind} كيلومتر في الساعة, {desc}'.encode('utf8'))
