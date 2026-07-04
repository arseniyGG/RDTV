# back/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx
from datetime import datetime

app = FastAPI(docs_url=None, redoc_url=None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENDOTA_LIVE_URL = "https://api.opendota.com/api/proMatches"

@app.get("/api/v1/matches/results/{page}")
async def get_pro_matches(page: int = 1):
    if page < 1:
        page = 1

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(OPENDOTA_LIVE_URL)
            response.raise_for_status()
            raw_matches = response.json()
            formatted_matches = []

            limit = 25
            start_index = (page - 1) * limit
            end_index = start_index + limit

            for match in raw_matches[start_index:end_index]:
                r_score = match.get("radiant_score", 0)
                d_score = match.get("dire_score", 0)

                if match.get("radiant_win") is True:
                    winner = "radiant"
                elif match.get("radiant_win") is False:
                    winner = "dire"
                else:
                    winner = "none"
                
                start_timestamp = match.get("start_time", 0)
                if start_timestamp:
                    date_str = datetime.fromtimestamp(start_timestamp).strftime("%d.%m.%Y")
                else:
                    date_str = "Недавно"

                s_type = match.get("series_type", 1)
                series_format = "Bo3" if s_type == 2 else ("Bo5" if s_type == 3 else "Bo1")

                formatted_matches.append({
                    "match_id": match.get("match_id"),
                    "league_name": match.get("league_name") or "Public Match",
                    "radiant_name": match.get("radiant_name") or "Radiant Team",
                    "dire_name": match.get("dire_name") or "Dire Team",
                    "radiant_score": r_score,
                    "dire_score": d_score,
                    "winner": winner,
                    "date": date_str,
                    "format": series_format
                })
                
            return formatted_matches
            
        except httpx.HTTPError:
            return []
        
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)